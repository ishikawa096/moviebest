import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'lib/api/auth'
import type { SignInParams } from 'interfaces/interface'
import { toastSuccess, toastError } from 'lib/toast'
import { AuthContext } from 'pages/_app'

export const useSignIn = () => {
  const router = useRouter()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: SignInParams = {
      email: email,
      password: password,
    }
    handleSignIn(params)
  }

  const handleGuestSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: SignInParams = {
      email: 'guest@example.com',
      password: 'guestloginpassword',
    }
    handleSignIn(params)
  }

  const handleSignIn = async (params: SignInParams) => {
    try {
      const res = await signIn(params)
      if (res.status === 200) {
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        toastSuccess('ログインしました')
        router.push('/')
      } else {
        toastError('emailかパスワードが違います')
      }
    } catch (err) {
      console.log(err)
      toastError('something error...')
    }
  }

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleGuestSubmit,
  }
}
