import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import type { CreateListParams, List, Theme, User } from 'interfaces/interface'
import { errorMessage, redirectToSignIn } from 'lib/helpers'
import { toastSuccess, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import NowLoading from 'components/commons/nowLoading'
import Headline from 'components/layout/headline'
import ListForm from 'components/lists/form/listForm'
import PageError from 'components/pageError'

interface State {
  state: { isLoading: false; list: List & { user: User; theme: Theme } } | { isLoading: true }
}

const EditList: React.FC = () => {
  const router = useRouter()
  const listId = router.query.id
  const [listState, setListState] = useState<State>({ state: { isLoading: true } })
  const [currentList, setCurrentList] = useState<List>()
  const { isSignedIn, currentUser } = useContext(AuthContext)

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/v1/lists', {
        params: {
          id: listId,
        },
      })
      const list = res.data
      if (currentUser && list.userId == currentUser.id) {
        setListState({ state: { isLoading: false, list: list } })
        setCurrentList(list)
      } else {
        toastWarn('このベストを編集することができません')
        router.back()
      }
    } catch (err) {
      errorMessage()
      router.back()
    }
  }

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else if (router.isReady) {
      if (listId) {
        fetchData()
      } else {
        toastWarn('不明なパラメーターです')
        router.back()
      }
    }
  }, [])

  const updateList = async (newData: { list: CreateListParams }) => {
    const newMoviesData = newData.list.movies
    const newMovies = currentList?.movies
      .map((cm) =>
        newMoviesData.map((m) =>
          m.position === cm.position
            ? {
                id: cm.id,
                title: m.title,
                position: m.position,
                tmdbId: m.tmdbId || 0,
                tmdbImage: m.tmdbImage || '',
              }
            : null
        )
      )
      .flat()
      .filter((m) => m)

    const newList = {
      comment: newData.list.comment,
      movies: newMovies,
    }
    try {
      const response = await axios.patch('/api/v1/lists', {
        params: { list: newList },
        id: listId,
      })
      if (response.status !== 200 || response.data.status) throw Error(response.data.message)

      const savedList = response.data
      toastSuccess('リストが更新されました')
      router.push(`/lists/${savedList.id}`)
    } catch (err) {
      errorMessage()
    }
  }

  return (
    <>
      <PageHead title='新規リスト作成' />
      <Headline>
        <h1>ベストの編集</h1>
      </Headline>
      {listState.state.isLoading ? <NowLoading /> : <ListForm onSave={updateList} theme={listState.state.list.theme} listProp={listState.state.list} />}
    </>
  )
}

export default EditList
