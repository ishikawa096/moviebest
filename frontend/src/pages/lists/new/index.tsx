import { useState, useEffect, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import PageHead from 'components/layout/pageHead'
import type { CreateListParams, Theme } from 'interfaces/interface'
import { redirectToSignIn, sortByNewest } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import ThemeSelect from 'components/lists/form/themeSelect'
import ListForm from 'components/lists/form/listForm'
import NowLoading from 'components/commons/nowLoading'
import Headline from 'components/layout/headline'
import { fetchData, getThemes, postList } from 'lib/fetcher'
import PageError from 'components/pageError'

interface State {
  state: { isLoading: false; theme: Theme } | { isLoading: true }
}

const NewList = () => {
  const router = useRouter()
  const queryThemeId = Number(router.query.id)
  const [themeState, setThemeState] = useState<State>({ state: { isLoading: true } })
  const [themes, setThemes] = useState<Array<Theme>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<number | string | undefined>()
  const [isSending, setIsSending] = useState(false)
  const { isSignedIn } = useContext(AuthContext)

  const fetch = useCallback(async () => {
    const data = await fetchData(getThemes(), setError)
    if (data) {
      setThemes(sortByNewest(data))
      if (queryThemeId) {
        const queryTheme = data.find((t: Theme) => t.id === queryThemeId)
        if (queryTheme) {
          setThemeState({ state: { isLoading: false, theme: queryTheme } })
        }
      }
      setIsLoading(false)
    }
  }, [queryThemeId])

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else if (router.isReady) {
      fetch()
    }
  }, [])

  const handleThemeChange = (newValue: { value: Theme } | any) => {
    setThemeState({ state: { isLoading: false, theme: newValue.value } })
  }

  const createList = async (newData: { list: CreateListParams }) => {
    setIsSending(true)
    const savedList = await fetchData(postList(newData.list))
    if (savedList) {
      toastSuccess('ベストが作成されました')
      router.push(`/lists/${savedList.id}`)
    } else {
      setIsSending(false)
    }
  }

  return (
    <>
      {error ? (
        <PageError error={error} />
      ) : (
        <>
          <PageHead title='新規ベスト投稿' />
          <Headline>
            <h1>ベストを投稿する</h1>
          </Headline>
          {isLoading ? (
            <NowLoading />
          ) : themeState.state.isLoading ? (
            <ThemeSelect onChange={handleThemeChange} themes={themes} />
          ) : (
            <>
              <ThemeSelect onChange={handleThemeChange} theme={themeState.state.theme} themes={themes} />
              <ListForm onSave={createList} theme={themeState.state.theme} isSending={isSending} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default NewList
