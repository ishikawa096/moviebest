import type { CreateThemeParams } from 'interfaces/interface'
import { useRouter } from 'next/router'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import { errorMessage, redirectToSignIn } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import { useContext, useEffect, useState } from 'react'
import ThemeForm from 'components/themes/themeForm'
import Headline from 'components/layout/headline'
import NowLoading from 'components/commons/nowLoading'

const NewTheme = () => {
  const router = useRouter()
  const { isSignedIn } = useContext(AuthContext)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else {
      setIsLoading(false)
    }
  }, [])

  const createTheme = async (newData: { theme: CreateThemeParams }) => {
    setIsError(false)
    try {
      const response = await axios.post('/api/v1/client', {
        path: '/themes',
        params: { theme: newData.theme },
      })
      if (response.status !== 200 || response.data.status) throw Error(response.data.message)
      const savedTheme = response.data
      toastSuccess('お題が作成されました')
      router.push({
        pathname: '/lists/new',
        query: { id: savedTheme.id },
      })
    } catch (error) {
      errorMessage()
      setIsError(true)
    }
  }

  return (
    <>
      <PageHead title='新規お題作成' />
      <Headline>
        <h1>新しいお題をつくる</h1>
      </Headline>
      {isLoading ? <NowLoading /> : <ThemeForm onSave={createTheme} isError={isError} />}
    </>
  )
}

export default NewTheme
