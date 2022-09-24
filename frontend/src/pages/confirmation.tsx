import { ConfirmationParams, User } from 'interfaces/interface'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import { toastSuccess } from 'lib/toast'
import NowLoading from 'components/commons/nowLoading'
import SubmitButton from 'components/commons/submitButton'
import { authClient, confirmation } from 'lib/api/auth'
import PageError from 'components/pageError'
import SignInLayout from 'components/layout/signInLayout'
import Link from 'next/link'

interface UserState {
  state: { isLoading: false; user: User } | { isLoading: true }
}

const Confirmation = () => {
  const { isSignedIn, setIsSignedIn, setCurrentUser} = useContext(AuthContext)
  const router = useRouter()
  const [userState, setUserState] = useState<UserState>({ state: { isLoading: true } })
  const [error, setError] = useState<string>('')
  const [type, setType] = useState<'signup' | 'change' | ''>('')

  const confirm = useCallback(async () => {
    const params: ConfirmationParams = router.query
    const data = await authClient({ method: confirmation(params) })
    if (data) {
      setCurrentUser(data.data)
      setIsSignedIn(true)
      toastSuccess('認証が完了しました')
      setUserState({ state: { isLoading: false, user: data.data } })
    } else {
      setError('無効なURLか、既に完了した認証URLです')
    }
  },[type, router.query, setCurrentUser])

  useEffect(() => {
    isSignedIn ? setType('change') : setType('signup')
    if (router.isReady) {
      confirm()
    }
  }, [])

  return (
    <>
      {error ? (
        <PageError error={error} />
      ) : userState.state.isLoading ? (
        <NowLoading />
      ) : (
        <>
          <SignInLayout title={type === 'signup' ? 'アカウントが有効化されました' : '認証が完了しました'}>
            <div className='px-2 sm:px-5 py-5 flex flex-col items-center text-gray-700 gap-8'>
              {type === 'signup' ? (
                <>
                  <p className='text-lg'>ようこそ、{userState.state.user.name}さん！</p>
                  <p>早速 投稿してみましょう</p>
                  <SubmitButton onClick={() => router.push('/lists/new')} title='ベストを投稿' disabled={false} isSending={false} />
                  <SubmitButton onClick={() => router.push('/themes/new')} title='お題をつくる' disabled={false} isSending={false} />
                </>
              ) : (
                <>
                  <p className='text-lg'>アカウント情報の変更が完了しました！</p>
                  <Link href='/account'>
                    <a className='hover:underline text-md'>ユーザー情報画面へ戻る</a>
                  </Link>
                </>
              )}
            </div>
          </SignInLayout>
        </>
      )}
    </>
  )
}

export default Confirmation
