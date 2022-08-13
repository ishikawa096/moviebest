import { User } from 'interfaces/interface'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toastError, toastSuccess, toastWarn } from 'lib/toast'
import ImportantModal from 'lib/importantModal'
import { destroyCookies } from 'lib/api/authHelper'
import NowLoading from 'components/commons/nowLoading'
import Headline from 'components/commons/headline'
import SubmitButton from 'components/commons/submitButton'
import { redirect } from 'next/dist/server/api-utils'
import { redirectToSignIn } from 'lib/helpers'

interface UserState {
  state: { isLoading: false; user: User } | { isLoading: true }
}

const UserPage = () => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const router = useRouter()
  const [userState, setUserState] = useState<UserState>({ state: { isLoading: true } })
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    if (currentUser !== undefined) {
      setUserState({ state: { isLoading: false, user: currentUser } })
    }
    if (!userState.state.isLoading && userState.state.user.email === 'guest@example.com') setIsGuest(true) // TODO
  }, [])

  const handleDelete = async () => {
    setShowModal(false)
    if (!userState.state.isLoading) {
      try {
        const res = await axios.delete('/api/v1/client', {
          params: {
            path: '/auth',
          },
        })
        if (res.status !== 200) throw Error(res.statusText)
        toastSuccess('アカウントが削除されました')
        toastSuccess('ご利用ありがとうございました')
        destroyCookies()
        setIsSignedIn(false)
        router.push('/')
      } catch (err) {
        if (err instanceof Error) {
          toastError('削除できませんでした')
        }
      }
    } else {
      toastError('削除できませんでした')
    }
  }

  if (!isSignedIn && userState.state.isLoading) {
    redirectToSignIn(router)
    return
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
                  <div className='md:w-32 p-6 px-3 text-sm border-b bg-gray-100 whitespace-nowrap'>ユーザー名</div>
                  <div className='w-full p-6 border-b'>{userState.state.user.name}</div>
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='md:w-32 p-6 px-3 text-sm bg-gray-100 whitespace-nowrap'>Email</div>
                  <div className='w-full p-6'>{userState.state.user.email}</div>
                </div>
              </div>

              <div className='flex flex-col gap-10 pt-10 items-center'>
                {isGuest ? <p>ゲストユーザーはユーザー情報を変更できません</p> : undefined}
                <SubmitButton onClick={() => router.push('/setting')} title='情報変更' disabled={isGuest} isSending={false} />
                <SubmitButton onClick={() => setShowModal(true)} title='アカウント削除' disabled={isGuest} isSending={false} />
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

export default UserPage
