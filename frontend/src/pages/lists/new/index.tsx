import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import type { CreateListParams, Theme } from 'interfaces/interface'
import { errorMessage, redirectToSignIn } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import ThemeSelect from 'components/lists/form/themeSelect'
import ListForm from 'components/lists/form/listForm'
import NowLoading from 'components/commons/nowLoading'
import Headline from 'components/layout/headline'

interface State {
  state: { isLoading: false; theme: Theme } | { isLoading: true }
}

const NewList = () => {
  const router = useRouter()
  const queryThemeId = router.query.id
  const [themeState, setThemeState] = useState<State>({ state: { isLoading: true } })
  const [themes, setThemes] = useState<Array<Theme>>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isSignedIn } = useContext(AuthContext)

  const fetchTheme = async () => {
    try {
      const res = await axios.get('/api/v1/themes', {
        params: {
          id: queryThemeId,
        },
      })
      if (res.status !== 200 || res.data.status) throw Error(res.data.message)
      const theme = res.data
      setThemeState({ state: { isLoading: false, theme: theme } })
      setIsLoading(false)
    } catch (err) {
      errorMessage()
    }
  }

  const fetchThemes = async () => {
    try {
      const res = await axios.get('/api/v1/themes')
      if (res.status !== 200 || res.data.status) throw Error(res.data.message)
      const themes = res.data.sort((a: Theme, b: Theme) => (a.createdAt < b.createdAt ? 1 : -1))
      setThemes(themes)
      if (!queryThemeId) {
        setIsLoading(false)
      }
    } catch (err) {
      errorMessage()
    }
  }

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else if (router.isReady) {
      if (queryThemeId) {
        fetchTheme()
      }
      fetchThemes()
    }
  }, [])

  const handleThemeChange = (newValue: { value: Theme } | any) => {
    setThemeState({ state: { isLoading: false, theme: newValue.value } })
  }

  const createList = async (newData: { list: CreateListParams }) => {
    try {
      const response = await axios.post('/api/v1/lists', {
        params: { list: newData.list },
      })
      if (response.status !== 200 || response.data.status) throw Error(response.data.message)

      const savedList = response.data
      toastSuccess('ベストが作成されました')
      router.push(`/lists/${savedList.id}`)
    } catch (err) {
      errorMessage()
    }
  }

  return (
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
          <ListForm onSave={createList} theme={themeState.state.theme} />
        </>
      )}
    </>
  )
}

export default NewList
