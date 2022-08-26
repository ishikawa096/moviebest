import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { guestSignIn, signIn } from 'lib/api/auth'
import type { SignInParams } from 'interfaces/interface'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import SignInButton from 'components/commons/signInButton'
import FormError from 'components/formError'
import PageHead from 'components/layout/pageHead'
import SignInLayout from 'components/layout/signInLayout'
import SignInInput from 'components/signInInput'
import { alreadySignIn, errorMessage } from 'lib/helpers'

const SignIn: React.FC = () => {
  const router = useRouter()
  const { isSignedIn, setIsSignedIn, setCurrentUser, setIsGuest } = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isSending, setIsSending] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (isSignedIn) {
      alreadySignIn(router)
    }
  }, [router])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSending(true)
    const params: SignInParams = {
      email: email,
      password: password,
    }
    handleSignIn(params)
  }

  const handleGuestSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const res = await guestSignIn()
      if (res.status === 200 && res.data.data) {
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        setIsGuest(true)
        toastSuccess('ゲストログインしました')
        router.back()
      } else {
        setIsSending(false)
        errorMessage()
      }
    } catch (err) {
      setIsSending(false)
      errorMessage()
    }
  }

  const handleSignIn = async (params: SignInParams) => {
    try {
      const res = await signIn(params)
      if (res.status === 200 && res.data.data) {
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        toastSuccess('ログインしました')
        router.back()
      } else {
        setIsSending(false)
        setFormError('Emailかパスワードが違います')
      }
    } catch (err) {
      setIsSending(false)
      errorMessage()
    }
  }

  return (
    <>
      <PageHead title='ログイン' />
      <SignInLayout title='ログイン'>
        <form className='px-2 sm:px-5 py-5 flex flex-col'>
          {formError ? <FormError error={formError} /> : undefined}
          <SignInInput value={email} label='Email' name='email' type='email' autoComplete='email' onChange={handleEmailChange} />
          <SignInInput value={password} label='パスワード' name='password' type='password' autoComplete='current-password' onChange={handlePasswordChange} />
          <SignInButton onClick={handleSubmit} disabled={!email || !password ? true : false} isSending={isSending} text='ログイン' color='color' />
          <p className='pt-5 pb-2 text-sm'>アカウントをお持ちではない方は</p>
          <div className='flex flex-col sm:flex-row justify-center'>
            <SignInButton text='ゲストログイン' onClick={handleGuestSignIn} disabled={isSending} isSending={false} color='white' />
            <SignInButton text='新規登録' onClick={() => router.push('/signup')} disabled={isSending} isSending={false} color='color' />
          </div>
        </form>
      </SignInLayout>
    </>
  )
}

export default SignIn
