import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { UserEditParams } from 'interfaces/interface'
import { toastSuccess, toastError } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import axios from 'axios'
import PageHead from 'components/layout/pageHead'
import SignInButton from 'components/commons/signInButton'
import SignInInput from 'components/signInInput'
import { validateUserEdit } from 'lib/validates'
import { errorMessage, guestUserUnavailable, isEmptyObject, redirectToSignIn } from 'lib/helpers'
import Headline from 'components/layout/headline'
import NowLoading from 'components/commons/nowLoading'

const Setting: React.FC = () => {
  const router = useRouter()
  const { isSignedIn, currentUser, isGuest } = useContext(AuthContext)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [K in keyof UserEditParams]?: string }>({})

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else if (isGuest) {
      guestUserUnavailable(router)
    } else if (currentUser) {
      setEmail(currentUser.email)
      setName(currentUser.name)
      setIsLoading(false)
    }
  }, [])

  const handleAccountSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSending(true)
    const params = {
      name: name,
      email: email,
      currentPassword: currentPassword,
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
        toastError('パスワードが違うか無効な内容です')
      }
    } catch (err) {
      setIsSending(false)
      errorMessage()
    }
  }

  return (
    <>
      <PageHead title='アカウント情報変更' />
      <Headline>
        <h1>アカウント情報変更</h1>
      </Headline>
      {isLoading ? (
        <NowLoading />
      ) : (
        <div className='flex flex-col items-center px-5 md:px-32 text-gray-700'>
          <div className='bg-white w-full rounded-lg flex flex-col md:items-center p-5 md:p-10'>
            <form className='px-2 sm:px-5 py-5 md:min-w-[30rem] flex flex-col'>
              <SignInInput value={name} label='ユーザー名' name='name' type='text' autoComplete='nickname' onChange={(e) => setName(e.target.value)} error={formErrors.name} />
              <SignInInput value={email} label='Email' name='email' type='email' autoComplete='email' onChange={(e) => setEmail(e.target.value)} error={formErrors.email} />
              <SignInInput
                value={currentPassword}
                label='パスワード'
                name='currentPassword'
                type='password'
                autoComplete='current-password'
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={formErrors.currentPassword}
              />
              <SignInButton onClick={handleAccountSubmit} disabled={!name || !email || !currentPassword ? true : false} isSending={isSending} text='アカウント更新' color='color' />
            </form>
            <SignInButton onClick={() => router.push('/account')} disabled={false} isSending={false} text='ユーザー情報へ戻る' color='white' />
          </div>
        </div>
      )}
    </>
  )
}

export default Setting
