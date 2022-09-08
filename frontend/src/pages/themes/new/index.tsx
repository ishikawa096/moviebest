import type { CreateThemeParams } from 'interfaces/interface'
import { useRouter } from 'next/router'
import PageHead from 'components/layout/pageHead'
import { redirectToSignIn } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import { useContext, useEffect, useState } from 'react'
import ThemeForm from 'components/themes/themeForm'
import Headline from 'components/layout/headline'
import NowLoading from 'components/commons/nowLoading'
import { fetchData, postTheme } from 'lib/fetcher'

const NewTheme = () => {
  const router = useRouter()
  const { isSignedIn } = useContext(AuthContext)
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else {
      setIsLoading(false)
    }
  }, [isSignedIn, router])

  const createTheme = async (newData: { theme: CreateThemeParams }) => {
    setIsSending(true)
    const savedTheme = await fetchData(postTheme(newData.theme))
    if (savedTheme) {
      toastSuccess('お題が作成されました')
      router.push({
        pathname: '/lists/new',
        query: { id: savedTheme.id },
      })
    } else {
      setIsSending(false)
    }
  }

  return (
    <>
      <PageHead title='新規お題作成' />
      <Headline>
        <h1>新しいお題をつくる</h1>
      </Headline>
      {isLoading ? <NowLoading /> : <ThemeForm onSave={createTheme} isSending={isSending} />}
    </>
  )
}

export default NewTheme
