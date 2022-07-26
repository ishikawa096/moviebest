import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import type { createListParams, Theme } from 'interfaces/interface'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import { list } from 'postcss'

const ListForm = dynamic(() => import('components/listForm'), {
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
        toastWarn('不明なパラメーターです。トップページに移動します')
        router.push('/')
      }
    }
  }, [router])

  const { isSignedIn } = useContext(AuthContext)
  if (!isSignedIn) return <p>ログインしてください</p>

  const createList = async (newData: { list: createListParams }) => {
    try {
      const response = await axios.post('/api/v1/client', {
        key: 'list',
        data: newData.list,
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
    return <p>読み込み中</p>
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
