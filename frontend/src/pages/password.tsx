import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { PasswordParams, UserEditParams } from 'interfaces/interface'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import PageHead from 'components/layout/pageHead'
import SignInButton from 'components/commons/signInButton'
import SignInInput from 'components/signInInput'
import { validatePassword } from 'lib/validations'
import { guestUserUnavailable, isEmptyObject, redirectToSignIn } from 'lib/helpers'
import Headline from 'components/layout/headline'
import NowLoading from 'components/commons/nowLoading'
import { NextPage } from 'next/types'
import { authClient, putPassword } from 'lib/api/auth'

const Password: NextPage = () => {
  const router = useRouter()
  const { isSignedIn, isGuest } = useContext(AuthContext)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [K in keyof UserEditParams]?: string }>({})

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else if (isGuest) {
      guestUserUnavailable(router)
    } else {
      setIsLoading(false)
    }
  }, [isGuest, isSignedIn, router])

  const handlePasswordSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: PasswordParams = {
      currentPassword: currentPassword,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }
    const errors = validatePassword(params)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      setIsSending(true)

      const data = await authClient({ method: putPassword(params), setIsSending: setIsSending, failMessage: 'パスワードが違います' })
      if (data) {
        toastSuccess('パスワードを変更しました')
        router.push('/account')
      }
    }
  }

  return (
    <>
      <PageHead title='アカウント情報変更' />
      <Headline>
        <h1>パスワード変更</h1>
      </Headline>
      {isLoading ? (
        <NowLoading />
      ) : (
        <div className='flex flex-col items-center px-5 md:px-32 text-gray-700'>
          <div className='bg-white w-full rounded-lg flex flex-col md:items-center p-5 md:p-10'>
            <form className='px-2 sm:px-5 py-5 md:min-w-[30rem] flex flex-col'>
              <SignInInput
                value={currentPassword}
                label='現在のパスワード'
                name='currentPassword'
                type='password'
                autoComplete='current-password'
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={formErrors.currentPassword}
              />
              <SignInInput
                value={password}
                label='新しいパスワード'
                name='password'
                type='password'
                autoComplete='new-password'
                onChange={(e) => setPassword(e.target.value)}
                error={formErrors.password}
              />
              <SignInInput
                value={passwordConfirmation}
                label='確認用パスワード'
                name='passwordConfirmation'
                type='password'
                autoComplete='new-password'
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                error={formErrors.passwordConfirmation}
              />
              <SignInButton onClick={handlePasswordSubmit} disabled={!currentPassword || !password || !passwordConfirmation ? true : false} isSending={isSending} text='パスワード更新' color='color' />
            </form>
            <SignInButton onClick={() => router.push('/account')} disabled={false} isSending={false} text='ユーザー情報へ戻る' color='white' />
          </div>
        </div>
      )}
    </>
  )
}

export default Password
