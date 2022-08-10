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

export const AuthContext = createContext(
  {} as {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isSignedIn: boolean
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  }
)

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
        console.log(res?.data.data)
      } else {
        console.log(res)
        console.log('No current user')
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />
  }
  if (loading) {
    return <NowLoading />
  }
  return (
    <>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </AuthContext.Provider>
    </>
  )
}

export default MyApp
