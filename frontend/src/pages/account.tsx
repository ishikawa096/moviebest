import { User } from 'interfaces/interface'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toastError, toastInfo, toastSuccess } from 'lib/toast'
import ConfirmModal from 'lib/confirmModal'
import { destroyCookies } from 'lib/api/authHelper'

interface UserState {
  state: { isLoading: false; user: User } | { isLoading: true }
}

const UserPage = () => {
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const router = useRouter()
  const [userState, setUserState] = useState<UserState>({ state: { isLoading: true } })
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (currentUser !== undefined) {
      setUserState({ state: { isLoading: false, user: currentUser } })
    }
  }, [currentUser])

  const EditButton = () => (
    <button
      onClick={() => router.push('/password')}
      title='パスワード変更'
      className='w-40 h-10 bottom-10 flex justify-center items-center bg-cyan-500
          rounded-full drop-shadow-sm text-white text-lg
          hover:-translate-y-1 hover:scale-110 hover:bg-sky-400 duration-150 ease-in-out'
    >
      パスワード変更
    </button>
  )

  const DeleteButton = () => {
    return (
      <button
        onClick={() => setShowModal(true)}
        title='ユーザーを削除'
        className='w-40 h-10 bottom-10 flex justify-center items-center  bg-cyan-500
          rounded-full drop-shadow-sm text-white text-lg
          hover:-translate-y-1 hover:scale-110 hover:bg-sky-400 duration-150 ease-in-out'
      >
        削除
      </button>
    )
  }

  const handleDelete = async () => {
    setShowModal(false)
    if (!userState.state.isLoading) {
      try {
        const res = await axios.delete('/api/v1/client', {
          params: {
            endpoint: 'auth',
          },
        })
        if (res.status !== 200) throw Error(res.statusText)
        toastSuccess('アカウントが削除されました')
        toastSuccess('またのご利用お待ちしております') //todo 専用ページ
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
    router.push('/signin')
    toastInfo('ログインしてください')
    return
  }

  return (
    <>
      {userState.state.isLoading ? (
        <p>now loading...</p>
      ) : (
        <div>
            <h1>ユーザー名 {userState.state.user.name}</h1>
            email {userState.state.user.email}
            <div>
              {userState.state.user.email === 'guest@example.com' ?
                <p>ゲストユーザーはユーザー情報を変更できません</p>
              : <>
            <EditButton />
            <DeleteButton /></>}
          </div>
          <ConfirmModal
            showModal={showModal}
            title='アカウントを削除しますか？'
            description='作成したベストも削除されます'
            confirmationText='削除する'
            cancellationText='削除しない'
            handleConfirm={() => handleDelete()}
            handleCancel={() => setShowModal(false)}
          />
        </div>
      )}
    </>
  )
}

export default UserPage
