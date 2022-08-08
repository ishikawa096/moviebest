import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'
import { useContext, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toastError, toastSuccess } from 'lib/toast'
import ImportantModal from 'lib/importantModal'

interface Props {
  user: User & { lists: Array<List & { theme: Theme, isDeleted: boolean }> }
}

const UserPage = (props: Props) => {
  const router = useRouter()
  const user = props.user
  const userLists = user.lists
  const [update, setUpdate] = useState<boolean>(false)
  const [lists, setLists] = useState(userLists)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [targetId, setTargetId] = useState<number>()
  const [targetTitle, setTargetTitle] = useState<string>('')
  const { currentUser } = useContext(AuthContext)

  const EditButton = (list: { id: number }) => (
    <button
      onClick={() => router.push(`/lists/edit/${list.id}`)}
      title='ベストを編集'
      className='w-40 h-10 bottom-10 flex justify-center items-center bg-cyan-500
          rounded-full drop-shadow-sm text-white text-lg
          hover:-translate-y-1 hover:scale-110 hover:bg-sky-400 duration-150 ease-in-out'
    >
      編集
    </button>
  )

  const openModal = (list: { id: number; title: string }) => {
    const id = list.id
    const title = list.title
    setTargetId(id)
    setTargetTitle(list.title)
    setShowModal(true)
  }

  const DeleteButton = (list: { id: number; title: string }) => {
    return (
      <button
        onClick={() => openModal(list)}
        title='ベストを削除'
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
    if (targetId) {
      try {
        const res = await axios.delete('/api/v1/client', {
          params: {
            endpoint: `lists/${targetId}`,
          },
        })
        if (res.status !== 200) throw Error(res.statusText)
        toastSuccess('ベストが削除されました')
        const newLists = lists.map((l) => (l.id === targetId ? { ...l, isDeleted: true } : l))
        setLists(newLists)
        update ? setUpdate(false) : setUpdate(true)
      } catch (err) {
        if (err instanceof Error) {
          toastError('削除できませんでした')
        }
      }
    } else {
      toastError('削除できませんでした')
    }
  }

  return (
    <div>
      {currentUser?.id === user.id ? <h1>マイベスト</h1> : <h1>ユーザー名 {user.name}</h1>}
      <div>
        {lists.map((list) =>
          list.isDeleted ? null : (
            <div key={list.id}>
              <Link href={`/lists/${list.id}`}>
                <a>{list.theme.title}</a>
              </Link>

              {list.movies?.map((movie) => (
                <div key={movie.id}>{movie.title}</div>
              ))}
              <p>コメント：{list.comment}</p>

              {currentUser?.id === user.id ? (
                <>
                  <EditButton id={list.id} />
                  <DeleteButton id={list.id} title={list.theme.title} />
                </>
              ) : null}
            </div>
          )
        )}
      </div>
      <ImportantModal
        showModal={showModal}
        title='このベストを削除しますか？'
        description={`タイトル: "${targetTitle}"`}
        confirmationText='削除する'
        cancellationText='削除しない'
        handleConfirm={() => handleDelete()}
        handleCancel={() => setShowModal(false)}
      />
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id = context.params?.id
    const res = await client.get(`/users/${id}`)
    const user = res.data
    return { props: { user: user } }

  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } },
      }
    }
  }
}

export default UserPage
