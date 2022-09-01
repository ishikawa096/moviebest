import { List, Theme, User } from 'interfaces/interface'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import PageHead from 'components/layout/pageHead'
import Headline from 'components/layout/headline'
import { sortByNewest } from 'lib/helpers'
import { fetchData, getUser } from 'lib/fetcher'
import PageError from 'components/pageError'
import NowLoading from 'components/commons/nowLoading'
import ListsContainer from 'components/lists/listsContainer'

interface State {
  state: { isLoading: false; user: User & { lists: Array<List & { theme: Theme; isDeleted: boolean }> } } | { isLoading: true }
}

const UserPage = () => {
  const router = useRouter()
  const userId = Number(router.query.id)
  const [error, setError] = useState<number | string | undefined>()
  const [userState, setUserState] = useState<State>({ state: { isLoading: true } })
  const { currentUser } = useContext(AuthContext)

  const fetch = useCallback(async () => {
    const data = await fetchData(getUser(userId), setError)
    if (data) {
      setUserState({ state: { isLoading: false, user: data } })
    }
  },[userId])

  useEffect(() => {
    if (router.isReady) {
      if (userId) {
        fetch()
      } else {
        setError(400)
      }
    }
  }, [currentUser?.id, fetch, router.isReady, userId])

  if (error) {
    return <PageError error={error} />
  } else if (userState.state.isLoading) {
    return <NowLoading />
  } else {
    const user = userState.state.user
    const lists = sortByNewest(userState.state.user.lists)

    return (
      <>
        <PageHead title={user.name + 'さんの投稿一覧'} />
        <Headline>
          <h1>{user.name + 'さんの投稿一覧'}</h1>
        </Headline>
        <ListsContainer lists={lists.map((l) => ({ ...l, user: user }))} />
      </>
    )
  }
}

export default UserPage
