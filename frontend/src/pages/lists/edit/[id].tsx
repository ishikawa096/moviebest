import { useState, useEffect, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import PageHead from 'components/layout/pageHead'
import type { CreateListParams, UpdateMovieParams, List, Theme, User } from 'interfaces/interface'
import { redirectToSignIn } from 'lib/helpers'
import { toastSuccess, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import NowLoading from 'components/commons/nowLoading'
import Headline from 'components/layout/headline'
import ListForm from 'components/lists/form/listForm'
import { fetchData, getList, patchList } from 'lib/fetcher'

interface State {
  state: { isLoading: false; list: List & { user: User; theme: Theme } } | { isLoading: true }
}

const EditList: React.FC = () => {
  const router = useRouter()
  const listId = Number(router.query.id)
  const [listState, setListState] = useState<State>({ state: { isLoading: true } })
  const [currentList, setCurrentList] = useState<List>()
  const [isSending, setIsSending] = useState(false)
  const { isSignedIn, currentUser } = useContext(AuthContext)

  const fetch = useCallback(async () => {
    const list = await fetchData(getList(listId))
    if (currentUser && list && list.userId == currentUser.id) {
      setListState({ state: { isLoading: false, list: list } })
      setCurrentList(list)
    } else {
      toastWarn('このベストは編集できません')
      router.back()
    }
  }, [listId, currentUser, router])

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else if (router.isReady) {
      if (listId) {
        fetch()
      } else {
        toastWarn('不明なパラメーターです')
        router.back()
      }
    }
  }, [fetch, isSignedIn, listId, router])

  const updateList = async (newData: { list: CreateListParams }) => {
    if (currentList) {
      setIsSending(true)
      const newMoviesData = newData.list.movies
      const newMovies: Array<UpdateMovieParams> = currentList.movies
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
        .filter((m: UpdateMovieParams | null): m is UpdateMovieParams => m !== null)

      const newList = {
        comment: newData.list.comment,
        movies: newMovies,
      }

      const savedList = await fetchData(patchList(listId, newList))
      if (savedList) {
        toastSuccess('ベストが更新されました')
        router.push(`/lists/${currentList.id}`)
      } else {
        setIsSending(false)
      }
    }
  }

  return (
    <>
      <PageHead title='新規リスト作成' />
      <Headline>
        <h1>ベストの編集</h1>
      </Headline>
      {listState.state.isLoading ? <NowLoading /> : <ListForm onSave={updateList} theme={listState.state.list.theme} listProp={listState.state.list} isSending={isSending} />}
    </>
  )
}

export default EditList
