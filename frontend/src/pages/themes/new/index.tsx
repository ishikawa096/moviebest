import type { CreateThemeParams } from 'interfaces/interface'
import { useRouter } from 'next/router'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import { useContext, useState } from 'react'
import ThemeForm from 'components/themes/themeForm'
import Headline from 'components/commons/headline'

const NewTheme = () => {
  const router = useRouter()
  const { isSignedIn } = useContext(AuthContext)
  const [isError, setIsError] = useState(false)

  const createTheme = async (newData: { theme: CreateThemeParams }) => {
    setIsError(false)
    try {
      const response = await axios.post('/api/v1/client', {
        endpoint: 'themes',
        params: { theme: newData.theme },
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
        setIsError(true)
      }
    }
  }

  if (!isSignedIn) {
    router.push('/signin')
    toastWarn('ログインしてください')
    return
  }

  return (
    <>
      <PageHead title='新規お題作成' />
      <Headline>
        <h1>新しいお題をつくる</h1>
      </Headline>
      <ThemeForm onSave={createTheme} isError={isError} />
    </>
  )
}

export default NewTheme
