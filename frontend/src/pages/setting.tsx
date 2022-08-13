import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { PasswordParams, UserEditParams } from 'interfaces/interface'
import { toastSuccess, toastError } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import SignInButton from 'components/commons/signInButton'
import SignInInput from 'components/signInInput'
import { validatePassword, validateUserEdit } from 'lib/validates'
import { errorMessage, isEmptyObject, redirectToSignIn } from 'lib/helpers'
import Headline from 'components/commons/headline'

const PasswordPage: React.FC = () => {
  const router = useRouter()
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [isSending, setIsSending] = useState(false)
  const [isSendingPassword, setIsSendingPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [K in keyof UserEditParams]?: string }>({})

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email)
      setName(currentUser.name)
    }
  }, [])

  if (!isSignedIn && currentUser === undefined) {
    redirectToSignIn(router)
    return <></>
  }

  const handleAccountSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSending(true)
    const params = {
      name: name,
      email: email,
    }
    const errors = validateUserEdit(params)
    setFormErrors(errors)
    if (!isEmptyObject(errors)) {
      setIsSending(false)
      return
    }
    try {
      const res = await axios.put('/api/v1/auth/update', params)
      if (res.status === 200 && res.data.status === 'success') {
        toastSuccess('ユーザー情報を変更しました')
        router.push('/account')
      } else {
        setIsSending(false)
        console.log(res)
        toastError('登録済みか無効な内容です')
      }
    } catch (err) {
      setIsSending(false)
      errorMessage()
    }
  }

  const handlePasswordSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSendingPassword(true)
    const params: PasswordParams = {
      currentPassword: currentPassword,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }
    const errors = validatePassword(params)
    setFormErrors(errors)
    if (!isEmptyObject(errors)) {
      setIsSendingPassword(false)
      return
    }
    try {
      const res = await axios.put('/api/v1/auth/update', params)
      if (res.status === 200 && res.data.status === 'success') {
        toastSuccess('パスワードを変更しました')
        setIsSendingPassword(false)
        setCurrentPassword('')
        setPassword('')
        setCurrentPassword('')
      } else {
        setIsSendingPassword(false)
        toastError('パスワードの認証に失敗しました')
      }
    } catch (err) {
      setIsSendingPassword(false)
      errorMessage()
    }
  }

  return (
    <>
      <PageHead title='アカウント情報変更' />
      <Headline>
        <h1>アカウント情報変更</h1>
      </Headline>
      <div className='flex flex-col items-center px-5 md:px-32 text-gray-700'>
        <div className='bg-white w-full rounded-lg flex flex-col md:items-center p-5 md:p-10'>
          <form className='px-2 sm:px-5 py-5 flex flex-col'>
            <SignInInput value={name} label='ユーザー名' name='name' type='text' autoComplete='nickname' onChange={(e) => setName(e.target.value)} error={formErrors.name} />
            <SignInInput value={email} label='Email' name='email' type='email' autoComplete='email' onChange={(e) => setEmail(e.target.value)} error={formErrors.email} />
            <SignInButton onClick={handleAccountSubmit} disabled={!name && !email ? true : false} isSending={isSending} text='アカウント更新' color='color' />
            <p className='pt-2 pb-5 text-xs'>パスワードを変更する場合は以下の入力が必要です</p>
            <SignInInput
              value={currentPassword}
              label='現在のパスワード'
              name='currentPassword'
              type='password'
              autoComplete='current-password'
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={formErrors.currentPassword}
            />
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
            <SignInButton
              onClick={handlePasswordSubmit}
              disabled={!currentPassword || !password || !passwordConfirmation ? true : false}
              isSending={isSendingPassword}
              text='パスワード更新'
              color='color'
            />
          </form>
          {/* <p className='underline text-sm text-blue-500 hover:text-blue-200'> */}
          <SignInButton onClick={() => router.back()} disabled={false} isSending={false} text='ユーザー情報へ戻る' color='white' />
          {/* </p> */}
        </div>
      </div>
    </>
  )
}

export default PasswordPage
