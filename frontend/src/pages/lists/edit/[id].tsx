import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import type { CreateListParams, List, Theme, User } from 'interfaces/interface'
import { errorMessage, redirectToSignIn } from 'lib/helpers'
import { toastError, toastSuccess, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import NowLoading from 'components/commons/nowLoading'
import Headline from 'components/commons/headline'

const ListForm = dynamic(() => import('components/lists/form/listForm'), {
  ssr: false,
})

interface State {
  state: { isLoading: false; list: List & { user: User; theme: Theme } } | { isLoading: true }
}

const EditList: React.FC = () => {
  const router = useRouter()
  const listId = router.query.id
  const [listState, setListState] = useState<State>({ state: { isLoading: true } })
  const [currentList, setCurrentList] = useState<List>()

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/v1/client', {
        params: {
          path: `/lists/${listId}`,
        },
      })
      const list = res.data
      setListState({ state: { isLoading: false, list: list } })
      setCurrentList(list)
    } catch (err) {
      toastError('something wrong...')
      router.push('/')
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (listId) {
        fetchData()
      } else {
        toastWarn('不明なパラメーターです。トップページに移動します')
        router.push('/')
      }
    }
  }, [router])

  const { isSignedIn, currentUser } = useContext(AuthContext)
  if (!isSignedIn && listState.state.isLoading) {
    redirectToSignIn(router)
    return <></>
  }

  if (!listState.state.isLoading) {
    const { list } = listState.state
    const user = list.user
    if (!currentUser || currentUser.id !== user.id) {
      router.back()
      toastWarn('このリストを編集することができません')
      return <></>
    }
  }

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
                tmdbId: m.tmdbId,
                tmdbImage: m.tmdbImage,
              }
            : null
        )
      )
      .flat()
      .filter((m) => m)

    const newList = {
      comment: newData.list.comment,
      numbered: newData.list.numbered,
      movies: newMovies,
    }
    try {
      const response = await axios.patch('/api/v1/client', {
        params: { list: newList },
        path: `/lists/${listId}`,
      })
      if (response.status !== 200 || response.data.status) throw Error(response.statusText)

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
