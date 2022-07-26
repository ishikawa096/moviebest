import type { CreateThemeParams, Theme } from 'interfaces/interface'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import { useContext } from 'react'

const ThemeForm = dynamic(() => import('components/themeForm'), {
  ssr: false
})

const NewTheme = () => {
  const router = useRouter()
  const { isSignedIn } = useContext(AuthContext)

  const createTheme = async (newData: { theme: CreateThemeParams }) => {
    try {
      const response = await axios.post('/api/v1/client', {
        data: newData.theme,
        endpoint: 'themes',
        key: 'theme',
      })
      if (response.status !== 200) throw Error(response.statusText)
      const savedTheme = response.data
      toastSuccess('お題が作成されました')
      router.push({
        pathname: '/lists/new',
        query: { id: savedTheme.id },
      })
    } catch (error) {
      if (error instanceof Error) {
        handleAxiosError(error)
      }
    }
  }

  if (!isSignedIn) return <p>ログインしてください</p>

  return (
    <>
      <PageHead title='新規お題作成' />
      <h1>新しいお題を作る</h1>
      <ThemeForm onSave={createTheme} />
    </>
  )
}

export default NewTheme
