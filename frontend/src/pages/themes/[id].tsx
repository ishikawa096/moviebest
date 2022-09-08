import { List, Theme, User } from 'interfaces/interface'
import FloatingButton from 'components/commons/floatingButton'
import { useRouter } from 'next/router'
import ListsContainer from 'components/lists/listsContainer'
import PageHead from 'components/layout/pageHead'
import Headline from 'components/layout/headline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { sortByNewest } from 'lib/helpers'
import { useCallback, useEffect, useState } from 'react'
import { fetchData, getTheme } from 'lib/fetcher'
import PageError from 'components/pageError'
import NowLoading from 'components/commons/nowLoading'

interface State {
  state: { isLoading: false; theme: Theme & { lists: Array<List & { user: User }> } } | { isLoading: true }
}

const ThemePage = () => {
  const router = useRouter()
  const themeId = Number(router.query.id)
  const [error, setError] = useState<number | string | undefined>()
  const [themeState, setThemeState] = useState<State>({ state: { isLoading: true } })

  const fetch = useCallback(async () => {
    const data = await fetchData(getTheme(themeId), setError)
    if (data) {
      setThemeState({ state: { isLoading: false, theme: data } })
    }
  }, [themeId])

  useEffect(() => {
    if (router.isReady) {
      if (themeId) {
        fetch()
      } else {
        setError(400)
      }
    }
  }, [fetch, router.isReady, themeId])

  const buttonHandler = () => {
    if (!themeState.state.isLoading) {
      const { id } = themeState.state.theme
      router.push({
        pathname: '/lists/new',
        query: { id: id },
      })
    }
  }

  if (error) {
    return <PageError error={error} />
  } else if (themeState.state.isLoading) {
    return <NowLoading />
  } else {
    const theme = themeState.state.theme
    const lists = theme.lists.map((l) => ({ ...l, theme: theme }))
    sortByNewest(lists)

    return (
      <>
        <PageHead title={theme.title + 'の一覧'} />
        <Headline>
          <h1 className='italic text-3xl'>
            <FontAwesomeIcon icon={faHashtag} className='px-1' size='xs' />
            {theme.title}
          </h1>
        </Headline>
        <ListsContainer lists={lists} />
        <FloatingButton onClick={buttonHandler} content={<FontAwesomeIcon icon={faFilePen} />} />
      </>
    )
  }
}

export default ThemePage
