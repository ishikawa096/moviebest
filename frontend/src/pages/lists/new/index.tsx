import { useState, useEffect, useContext, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import type { CreateListParams, Theme } from 'interfaces/interface'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import ThemeSelect from 'components/lists/form/themeSelect'

const ListForm = dynamic(() => import('components/lists/form/listForm'), {
  ssr: false,
})

interface State {
  state: { isLoading: false; theme: Theme } | { isLoading: true }
}

const NewList = () => {
  const router = useRouter()
  const themeId = router.query.id
  const [themeState, setThemeState] = useState<State>({ state: { isLoading: true } })
  const [themes, setThemes] = useState<Array<Theme>>([])

  const fetchTheme = async () => {
    const res = await axios.get('/api/v1/client', {
      params: {
        endpoint: `themes/${themeId}`,
      },
    })
    if (res.status !== 200) throw Error(res.statusText)
    const theme = res.data
    setThemeState({ state: { isLoading: false, theme: theme } })
  }

  const fetchThemes = async () => {
    const res = await axios.get('/api/v1/client', {
      params: {
        endpoint: `themes`,
      },
    })
    if (res.status !== 200) throw Error(res.statusText)
    const themes = res.data.sort((a: Theme, b: Theme) => (a.createdAt < b.createdAt ? 1 : -1))
    setThemes(themes)
  }

  useEffect(() => {
    if (router.isReady) {
      if (themeId) {
        fetchTheme()
      }
      fetchThemes()
    }
  }, [router])

  const { isSignedIn } = useContext(AuthContext)
  if (!isSignedIn && themeState.state.isLoading) {
    router.push('/signin')
    toastWarn('ログインしてください')
    return
  }

  const handleThemeChange = (newValue: { value: Theme } | any) => {
    setThemeState({ state: { isLoading: false, theme: newValue.value } })
  }

  const createList = async (newData: { list: CreateListParams }) => {
    try {
      const response = await axios.post('/api/v1/client', {
        params: { list: newData.list },
        endpoint: 'lists',
      })
      if (response.status !== 200) throw Error(response.statusText)

      const savedList = response.data
      toastSuccess('リストが作成されました')
      router.push(`/lists/${savedList.id}`)
    } catch (err) {
      if (err instanceof Error) {
        handleAxiosError(err)
      }
    }
  }

  return (
    <>
      <PageHead title='新規リスト作成' />
      <div className='w-full text-2xl lg:text-4xl text-center py-10 tracking-widest text-gray-700'>
        <h1>新しいベストをつくる</h1>
      </div>
      {themeState.state.isLoading ? (
        <div className='flex flex-col w-full mb-1 p-10'>
          <div className='text-center text-sm md:text-base'>まずお題を選ぼう</div>
          <ThemeSelect onChange={handleThemeChange} themes={themes} />
        </div>
      ) : (
        <>
            <div className='w-full'>
            <div className='w-full mb-1 p-10'>
                <ThemeSelect onChange={handleThemeChange} theme={themeState.state.theme} themes={themes} />
                </div>
            <ListForm onSave={createList} theme={themeState.state.theme} />
          </div>
        </>
      )}
    </>
  )
}

export default NewList
