import { User } from 'interfaces/interface'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import { toastSuccess } from 'lib/toast'
import ImportantModal from 'components/importantModal'
import { destroyCookies } from 'lib/api/authHelper'
import NowLoading from 'components/commons/nowLoading'
import Headline from 'components/layout/headline'
import SubmitButton from 'components/commons/submitButton'
import { redirectToSignIn } from 'lib/helpers'
import { authClient, userDelete } from 'lib/api/auth'

interface UserState {
  state: { isLoading: false; user: User } | { isLoading: true }
}

const Account = () => {
  const { isSignedIn, setIsSignedIn, currentUser, isGuest } = useContext(AuthContext)
  const router = useRouter()
  const [userState, setUserState] = useState<UserState>({ state: { isLoading: true } })
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (!isSignedIn) {
      redirectToSignIn(router)
    } else if (currentUser) {
      setUserState({ state: { isLoading: false, user: currentUser } })
    }
  }, [])

  const handleDelete = async () => {
    setShowModal(false)
    const data = await authClient({ method: userDelete(), failMessage: '削除できませんでした' })
    if (data) {
      toastSuccess('アカウントが削除されました')
      toastSuccess('ご利用ありがとうございました')
      destroyCookies()
      setIsSignedIn(false)
      router.push('/')
    }
  }

  return (
    <>
      {userState.state.isLoading ? (
        <NowLoading />
      ) : (
        <>
          <Headline>
            <h1>ユーザー設定</h1>
          </Headline>

          <div className='flex flex-col items-center px-5 md:px-32 text-gray-700'>
            <div className='bg-white w-full rounded-lg flex flex-col md:items-center p-5 md:p-10'>
              <div className='text-lg text-center rounded-lg border'>
                <div className='flex flex-col md:flex-row'>
                  <div className='md:w-36 p-6 px-3 text-sm border-b bg-gray-100 whitespace-nowrap'>ユーザー名</div>
                  <div className='w-full p-6 border-b'>{userState.state.user.name}</div>
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='md:w-36 p-6 px-3 text-sm bg-gray-100 whitespace-nowrap'>Email</div>
                  <div className='w-full p-6'>{userState.state.user.email}</div>
                </div>
              </div>

              <div className='flex flex-col gap-10 pt-10 items-center'>
                {isGuest ? <p>ゲストユーザーはユーザー情報を変更できません</p> : undefined}
                <SubmitButton onClick={() => router.push('/setting')} title='名前・Eメール変更' disabled={isGuest} isSending={false} />
                <SubmitButton onClick={() => router.push('/password')} title='パスワード変更' disabled={isGuest} isSending={false} />
                <SubmitButton onClick={() => setShowModal(true)} title='アカウント削除' disabled={isGuest} isSending={false} color='red' />
              </div>
            </div>
          </div>

          <ImportantModal
            showModal={showModal}
            title='アカウントを削除しますか？'
            description='作成したベストも削除されます'
            confirmationText='削除する'
            cancellationText='削除しない'
            handleConfirm={() => handleDelete()}
            handleCancel={() => setShowModal(false)}
          />
        </>
      )}
    </>
  )
}

export default Account
