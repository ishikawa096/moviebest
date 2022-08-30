import { List, Theme, User } from 'interfaces/interface'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'pages/_app'
import { useRouter } from 'next/router'
import { toastSuccess } from 'lib/toast'
import ImportantModal from 'components/importantModal'
import ListCard from 'components/lists/listCard'
import PageHead from 'components/layout/pageHead'
import Headline from 'components/layout/headline'
import { InView } from 'react-intersection-observer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { errorMessage, sortByNewest } from 'lib/helpers'
import ScrollButton from 'components/commons/scrollButton'
import { deleteList, getUser } from 'lib/fetcher'
import PageError from 'components/pageError'
import NowLoading from 'components/commons/nowLoading'

interface State {
  state: { isLoading: false; user: User & { lists: Array<List & { theme: Theme; isDeleted: boolean }> } } | { isLoading: true }
}

const UserPage = () => {
  const router = useRouter()
  const userId = Number(router.query.id)
  const [isError, setIsError] = useState(false)
  const [userState, setUserState] = useState<State>({ state: { isLoading: true } })
  const [update, setUpdate] = useState<boolean>(false)
  const [lists, setLists] = useState<Array<List & { theme: Theme; isDeleted: boolean }> | undefined>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [targetId, setTargetId] = useState<number>()
  const [targetTitle, setTargetTitle] = useState<string>('')
  const { currentUser } = useContext(AuthContext)

  const fetchData = async () => {
    try {
      const res = await getUser(userId)
      if (res.status !== 200 || res.data.status) {
        setIsError(true)
      } else {
        setUserState({ state: { isLoading: false, user: res.data } })
      }
    } catch (err) {
      setIsError(true)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (userId) {
        fetchData()
      } else {
        setIsError(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!userState.state.isLoading) {
      const userLists = sortByNewest(userState.state.user.lists)
      setLists(userLists)
    }
  }, [userState])

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
        const response = await deleteList(targetId)
        if (response.status !== 200 || response.data.status) throw Error(response.data.message)
        toastSuccess('ベストが削除されました')
        const newLists = lists?.map((l) => (l.id === targetId ? { ...l, isDeleted: true } : l))
        setLists(newLists)
        setUpdate(!update)
      } catch (err) {
        errorMessage()
      }
    } else {
      errorMessage()
    }
  }

  if (isError) {
    return <PageError />
  } else if (userState.state.isLoading) {
    return <NowLoading />
  } else {
    const user = userState.state.user
    return (
      <>
        <PageHead title={user.name + 'さんの投稿一覧'} />
        <Headline>
          <h1>{user.name + 'さんの投稿一覧'}</h1>
        </Headline>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 px-2 grid-flow-row-dense'>
          {lists?.map((list) =>
            list.isDeleted ? null : (
              <InView triggerOnce={true} rootMargin='-100px' key={'list-card-' + list.id}>
                {({ inView, ref }) => {
                  return (
                    <div ref={ref} className={`min-h-[300px] relative ${inView ? 'motion-safe:animate-fade' : ''}`}>
                      {inView && currentUser?.id === user.id ? (
                        <div className='absolute bottom-0 sm:bottom-2 left-1/2 z-20 flex-row flex-nowrap text-lg text-white space-x-7'>
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
        <ScrollButton />
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
}

export default UserPage
