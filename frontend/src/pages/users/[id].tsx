import type { GetServerSidePropsContext } from 'next'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'
import { useContext, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toastSuccess } from 'lib/toast'
import ImportantModal from 'lib/importantModal'
import ListCard from 'components/lists/listCard'
import PageHead from 'components/layout/pageHead'
import Headline from 'components/layout/headline'
import { InView } from 'react-intersection-observer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { errorMessage } from 'lib/helpers'

interface Props {
  user: User & { lists: Array<List & { theme: Theme; isDeleted: boolean }> }
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
    <button onClick={() => router.push(`/lists/edit/${list.id}`)} title='ベストを編集' className='w-5 h-5 ml-5 hover:-translate-y-1 hover:scale-110 hover:text-gray-300 duration-150 ease-in-out'>
      <FontAwesomeIcon icon={faPen} />
    </button>
  )

  const DeleteButton = (list: { id: number; title: string }) => (
    <button onClick={() => openModal(list)} title='ベストを削除' className='w-5 h-5 ml-5 hover:-translate-y-1 hover:scale-110 hover:text-gray-300 duration-150 ease-in-out'>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  )

  const openModal = (list: { id: number; title: string }) => {
    const id = list.id
    const title = list.title
    setTargetId(id)
    setTargetTitle(title)
    setShowModal(true)
  }

  const handleDelete = async () => {
    setShowModal(false)
    if (targetId) {
      try {
        const response = await axios.delete('/api/v1/client', {
          params: {
            path: `/lists/${targetId}`,
          },
        })
        if (response.status !== 200 || response.data.status) throw Error(response.data.message)
        toastSuccess('ベストが削除されました')
        const newLists = lists.map((l) => (l.id === targetId ? { ...l, isDeleted: true } : l))
        setLists(newLists)
        update ? setUpdate(false) : setUpdate(true)
      } catch (err) {
        errorMessage()
      }
    } else {
      errorMessage()
    }
  }

  return (
    <>
      <PageHead title={user.name + 'さんの投稿一覧'} />
      <Headline>
        <h1>{user.name + 'さんの投稿一覧'}</h1>
      </Headline>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 px-2 grid-flow-row-dense'>
        {lists.map((list) =>
          list.isDeleted ? null : (
            <InView triggerOnce={true} rootMargin='-100px' key={list.id}>
              {({ inView, ref }) => {
                return (
                  <div ref={ref} className={`min-h-[300px] relative ${inView ? 'motion-safe:animate-fade' : ''} `}>
                    {inView && currentUser?.id === user.id ? (
                      <div className='absolute bottom-2 left-1/2 z-20 flex-row flex-nowrap text-lg text-white space-x-7'>
                        <EditButton id={list.id} />
                        <DeleteButton id={list.id} title={list.theme.title} />
                      </div>
                    ) : null}
                    {inView ? <ListCard user={user} movies={list.movies} theme={list.theme} /> : undefined}
                  </div>
                )
              }}
            </InView>
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
    </>
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
