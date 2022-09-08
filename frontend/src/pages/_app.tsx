import '/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import type { User } from 'interfaces/interface'
import Error from 'next/error'
import { useState, useEffect, createContext } from 'react'
import { ToastContainer } from 'react-toastify'
import Layout from 'components/layout/layout'
import { getCurrentUser } from 'lib/api/auth'
import NowLoading from 'components/commons/nowLoading'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import PageError from 'components/pageError'
config.autoAddCss = false

const GUEST_USER_EMAIL = 'guest@example.com'

export const AuthContext = createContext(
  {} as {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isSignedIn: boolean
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
    isGuest: boolean
    setIsGuest: React.Dispatch<React.SetStateAction<boolean>>
  }
)

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
  const [isGuest, setIsGuest] = useState<boolean>(false)

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
        if (res?.data.data.email === GUEST_USER_EMAIL) {
          setIsGuest(true)
        }
      }
    } catch (err) {}
    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  if (loading) {
    return <NowLoading />
  }
  return (
    <>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, isGuest, setIsGuest }}>
        <Layout>
          {pageProps.error
            ? <PageError error={pageProps.error.statusCode} />
            : <Component {...pageProps} />}
        </Layout>
        <ToastContainer />
      </AuthContext.Provider>
    </>
  )
}

export default MyApp
