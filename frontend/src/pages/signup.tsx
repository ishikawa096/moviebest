import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from './_app'
import { authClient, signUp } from 'lib/api/auth'
import type { SignUpParams } from 'interfaces/interface'
import { toastSuccess } from 'lib/toast'
import SignInLayout from 'components/layout/signInLayout'
import SignInButton from 'components/commons/signInButton'
import SignInInput from 'components/signInInput'
import PageHead from 'components/layout/pageHead'
import { validateSignUp } from 'lib/validations'
import { alreadySignIn, isEmptyObject } from 'lib/helpers'

const SignUp: React.FC = () => {
  const router = useRouter()
  const { isSignedIn, setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [isSending, setIsSending] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [K in keyof SignUpParams]?: string }>({})

  useEffect(() => {
    if (isSignedIn) {
      alreadySignIn(router)
    }
  }, [router])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }
    const errors = validateSignUp(params)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      setIsSending(true)

      const data = await authClient({ method: signUp(params), setIsSending: setIsSending, failMessage: 'すでに登録済みか無効な内容です'})
      if (data) {
        setIsSignedIn(true)
        setCurrentUser(data.data)
        toastSuccess('登録完了！ログインしました')
        router.push('/')
      }
    }
  }

  return (
    <>
      <PageHead title='新規登録' />
      <SignInLayout title='新規登録'>
        <form className='px-2 sm:px-5 py-5 flex flex-col'>
          <SignInInput value={name} label='ユーザー名' name='name' type='text' autoComplete='nickname' onChange={(e) => setName(e.target.value)} error={formErrors.name} />
          <SignInInput value={email} label='Email' name='email' type='email' autoComplete='email' onChange={(e) => setEmail(e.target.value)} error={formErrors.email} />
          <SignInInput value={password} label='パスワード' name='password' type='password' autoComplete='new-password' onChange={(e) => setPassword(e.target.value)} error={formErrors.password} />
          <SignInInput
            value={passwordConfirmation}
            label='確認用パスワード'
            name='passwordConfirmation'
            type='password'
            autoComplete='new-password'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            error={formErrors.passwordConfirmation}
          />
          <SignInButton onClick={handleSubmit} disabled={!name || !email || !password || !passwordConfirmation ? true : false} isSending={isSending} text='新規登録' color='color' />
        </form>
      </SignInLayout>
    </>
  )
}

export default SignUp
