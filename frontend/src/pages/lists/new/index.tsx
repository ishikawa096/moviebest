import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import type { CreateListParams, Theme } from 'interfaces/interface'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import NowLoading from 'components/commons/nowLoading'

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

  useEffect(() => {
    if (router.isReady) {
      if (themeId) {
        fetchTheme()
      } else {
        toastWarn('エラーが起きました。前のページに戻ります')
        router.back()
      }
    }
  }, [router])

  const { isSignedIn } = useContext(AuthContext)
  if (!isSignedIn && themeState.state.isLoading) {
    router.push('/signin')
    toastWarn('ログインしてください')
    return
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

  if (themeState.state.isLoading) {
    return <NowLoading />
  }

  return (
    <>
      <PageHead title='新規リスト作成' />
      <h2>新しいリストを作る</h2>
      <ListForm onSave={createList} theme={themeState.state.theme} />
    </>
  )
}

export default NewList
