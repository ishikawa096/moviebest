import Link from 'next/link'
import { useRouter } from 'next/router'
import { List, Theme, User } from 'interfaces/interface'
import PostersContainer from 'components/lists/postersContainer'
import Posters from 'components/lists/posters'
import FloatingButton from 'components/commons/floatingButton'
import ListCard from 'components/lists/listCard'
import PageHead from 'components/layout/pageHead'
import ListPageButton from 'components/commons/listPageButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useContext, useEffect, useState } from 'react'
import { deleteList, fetchData, getList } from 'lib/fetcher'
import PageError from 'components/pageError'
import NowLoading from 'components/commons/nowLoading'
import ImportantModal from 'components/importantModal'
import { toastSuccess } from 'lib/toast'
import { AuthContext } from 'pages/_app'

const BLANK_IMAGE = '/assets/images/noimage.webp'

const ListPage = () => {
  const router = useRouter()
  const listId = Number(router.query.id)
  const [error, setError] = useState<number | string | undefined>()
  const [list, setList] = useState<(List & { user: User; theme: Theme }) | undefined>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { currentUser } = useContext(AuthContext)

  const fetch = useCallback(async () => {
    const data = await fetchData(getList(listId), setError)
    if (data) {
      setList(data)
    }
  }, [listId])

  useEffect(() => {
    if (router.isReady) {
      if (listId) {
        fetch()
      } else {
        setError(400)
      }
    }
  }, [fetch, listId, router.isReady])

  const handleNewList = () => {
    router.push({
      pathname: '/lists/new',
      query: { id: list?.theme.id },
    })
  }

  const handleDelete = async () => {
    setShowModal(false)
    const data = await fetchData(deleteList(listId))
    if (data) {
      toastSuccess('ベストが削除されました')
      router.push(`/users/${list?.userId}`)
    }
  }

  if (error) {
    return <PageError error={error} />
  } else if (list === undefined) {
    return <NowLoading />
  } else {
    const theme = list.theme
    const movies = list.movies.sort((a, b) => a.position - b.position)
    const user = list.user
    return (
      <>
        <PageHead title={user.name + 'さんの' + theme.title} />
        <div className='flex flex-col px-3 py-5 text-center text-gray-700 italic w-full'>
          <h3 className='mb-2 text-sm md:text-base lg:text-md px-2 py-1 w-full'>
            <Link href={`/users/${list.userId}`}>
              <a className='underline decoration-sky-500 hover:text-sky-400 hover:decoration-6 duration-150'>{user?.name}</a>
            </Link>
            さんの
          </h3>
          <h2 className='text-3xl md:text-4xl lg:text-5xl px-2 py-1'>
            <Link href={`/themes/${theme.id}`}>
              <a className='underline decoration-sky-500 hover:text-sky-400 duration-150'>
                <FontAwesomeIcon icon={faHashtag} className='px-1' size='xs' />
                {theme.title}
              </a>
            </Link>
          </h2>
        </div>
        <PostersContainer movies={list.movies}>
          <Posters movies={movies} theme={theme} blankImage={BLANK_IMAGE} />
        </PostersContainer>
        <div className='w-full flex flex-col items-center justify-center gap-10 mb-6'>
          <ListPageButton style='tweet' onClick={(e) => e} tweetProps={{ themeTitle: theme.title, movies: movies }} />
          {currentUser?.id === user.id ? (
            <div className='flex flex-row gap-10'>
              <ListPageButton style='edit' onClick={() => router.push(`/lists/edit/${list.id}`)} />
              <ListPageButton style='delete' onClick={() => setShowModal(true)} />
            </div>
          ) : null}
        </div>
        <div className='flex flex-col lg:flex-row justify-start mb-20 mx-40 rounded-lg items-center'>
          <div>
            <ListCard theme={theme} user={user} movies={movies} onDelete={() => router.push(`/users/${user.id}`)} />
          </div>

          <div className='flex flex-col min-h-[10rem] min-w-[20rem] w-full px-2 py-3 mt-10 lg:ml-10 bg-white text-center text-gray-700 rounded-lg whitespace-pre-line'>
            <span className='block text-sm p-3'>COMMENT</span>
            <hr />
            {list.comment ? <span className='py-8'>{list.comment}</span> : <span className='text-gray-300 text-sm block py-8'>コメントはありません</span>}
          </div>
        </div>

        <FloatingButton onClick={handleNewList} content={<FontAwesomeIcon icon={faPlus} />} />
        <ImportantModal
          showModal={showModal}
          title='このベストを削除しますか？'
          description={`タイトル: "${theme.title}"`}
          confirmationText='削除する'
          cancellationText='削除しない'
          handleConfirm={() => handleDelete()}
          handleCancel={() => setShowModal(false)}
        />
      </>
    )
  }
}

export default ListPage
