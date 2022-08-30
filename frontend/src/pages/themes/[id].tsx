import { List, Theme, User } from 'interfaces/interface'
import FloatingButton from 'components/commons/floatingButton'
import { useRouter } from 'next/router'
import ListsContainer from 'components/lists/listsContainer'
import PageHead from 'components/layout/pageHead'
import Headline from 'components/layout/headline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { sortByNewest } from 'lib/helpers'
import { useEffect, useState } from 'react'
import { getTheme } from 'lib/fetcher'
import PageError from 'components/pageError'
import NowLoading from 'components/commons/nowLoading'

interface State {
  state: { isLoading: false; theme: Theme & { lists: Array<List & { user: User }> } } | { isLoading: true }
}

const ThemePage = () => {
  const router = useRouter()
  const themeId = Number(router.query.id)
  const [isError, setIsError] = useState(false)
  const [themeState, setThemeState] = useState<State>({ state: { isLoading: true } })

  const fetchData = async () => {
    try {
      const res = await getTheme(themeId)
      if (res.status !== 200 || res.data.status) {
        setIsError(true)
      } else {
        setThemeState({ state: { isLoading: false, theme: res.data } })
      }
    } catch (err) {
      setIsError(true)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (themeId) {
        fetchData()
      } else {
        setIsError(true)
      }
    }
  }, [])

  const buttonHandler = () => {
    if (!themeState.state.isLoading) {
      const { id } = themeState.state.theme
      router.push({
        pathname: '/lists/new',
        query: { id: id },
      })
    }
  }

  if (isError) {
    return <PageError />
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
