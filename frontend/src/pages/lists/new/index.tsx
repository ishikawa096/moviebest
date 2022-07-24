import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { parseCookies } from 'nookies'
import PageHead from 'components/layout/pageHead'
import type { createListParams, Theme } from 'interfaces/interface'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'
import client from 'lib/api/client'
import { AuthContext } from 'pages/_app'

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
    const res = await client.get(`/themes/${themeId}`)
    if (res.status !== 200) throw Error(res.statusText)
    const theme = res.data
    setThemeState({ state: { isLoading: false, theme: theme } })
  }

  useEffect(() => {
    if (router.isReady) {
      fetchTheme()
    }
  }, [router])

  const { isSignedIn } = useContext(AuthContext)
  if (!isSignedIn) return <p>ログインしてください</p>

  const createList = async (newData: { list: createListParams }) => {
    try {
      const cookies = parseCookies()
      const response = await client.post('/lists', {
        list: newData.list,
      }, {
        headers: {
          'access-token': cookies._access_token,
          client: cookies._client,
          uid: cookies._uid,
        },
      })
      if (response.status !== 200) throw Error(response.statusText)

      const savedList = response.data
      toastSuccess('リストが作成されました')
      router.push(`/lists/${savedList.id}`)
    } catch (error: any) {
      handleAxiosError(error)
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
