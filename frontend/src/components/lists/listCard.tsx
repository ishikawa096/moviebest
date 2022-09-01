import { Movie, Theme, User } from 'interfaces/interface'
import Link from 'next/link'
import Image from 'next/image'
import { setImageUrl } from 'lib/tmdbHelpers'
import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { toastSuccess } from 'lib/toast'
import ImportantModal from 'components/importantModal'
import { fetchData, deleteList } from 'lib/fetcher'
import ListCardButton from './listCardButton'
import React from 'react'
import { AuthContext } from 'pages/_app'

const BLANK_IMAGE = '/assets/images/noimage.webp'
const MAX_TITLE_LENGTH = 20
const MAX_USER_NAME_LENGTH = 12

interface Props {
  theme: Theme
  user: User
  movies: Array<Movie>
  onDelete?: () => void
}

const ListCard = React.memo(({ theme, user, movies, onDelete }: Props) => {
  const router = useRouter()
  const listId = movies[0].listId
  const [showModal, setShowModal] = useState<boolean>(false)
  const [update, setUpdate] = useState(false)
  const [image, setImage] = useState(setImageUrl(movies[0]))
  const [isOwner, setIsOwner] = useState(false)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (router.isReady) {
      if (currentUser?.id === user.id) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    }
  }, [currentUser?.id, router.isReady, user])

  const handleDelete = async () => {
    setShowModal(false)
    const resData = await fetchData(deleteList(listId))
    if (resData) {
      toastSuccess('ベストが削除されました')
      onDelete?.()
    }
  }

  const onError = () => {
    setImage(BLANK_IMAGE)
    setUpdate(!update)
  }

  const omitLength = (title: string, max: number) => {
    if (title.length > max + 1) {
      const result = title.substring(0, max) + '…'
      return result
    } else {
      return title
    }
  }

  const baseClass = 'bg-opacity-50 bg-gray-400 backdrop-blur-xl backdrop-saturate-[10] text-white text-center'

  const listColumn = movies.map((movie) => (
    <div key={'list-column-' + movie.id} className='flex flex-row text-white rounded-sm overflow-hidden'>
      <span className={`mr-[1px] flex font-sans w-5 items-center text-sm sm:text-base ${movie.position + 1 >= 10 ? 'pl-0.5' : 'pl-1.5'} ${baseClass}`}>{movie.position + 1}</span>
      <span
        className={`'pl-1 py-1 sm:py-1 flex items-center justify-center tracking-tighter whitespace-nowrap w-full ${
          movie.title.length > 12 ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
        } ${baseClass}`}
      >
        {omitLength(movie.title, MAX_TITLE_LENGTH)}
      </span>
    </div>
  ))

  return (
    <>
      <div className='relative flex flex-col w-72 sm:w-[22rem] h-[fit-content] min-h-[25rem] sm:min-h-[30rem] mr-auto ml-auto justify-center items-center rounded-xl overflow-hidden hover:drop-shadow-xl duration-150'>
        <Image src={image} alt={movies[0] + 'の画像'} layout='fill' objectFit='cover' placeholder='blur' blurDataURL={BLANK_IMAGE} onError={() => onError()} />

        <div className='absolute flex flex-col w-full h-full z-10'>
          <Link href={`/themes/${theme.id}`}>
            <a className={`${baseClass} block p-3 sm:p-4 text-lg sm:text-xl hover:underline`}>
              <FontAwesomeIcon icon={faHashtag} className='px-1' size='sm' />
              {theme.title}
            </a>
          </Link>
          <Link href={`/lists/${movies[0].listId}`}>
            <a className='flex flex-col justify-around h-full px-1 sm:px-2 mb-8 sm:mb-10'>{listColumn}</a>
          </Link>

          <div className={`${baseClass} absolute bottom-0 px-1 sm:px-2 flex flex-row justify-between w-full font-light`}>
            <Link href={`/users/${user.id}`}>
              <a className='hover:underline py-1'>
                <FontAwesomeIcon icon={faUser} className='px-1' />
                {omitLength(user.name, MAX_USER_NAME_LENGTH)}
              </a>
            </Link>
            {isOwner ? (
              <>
                <ListCardButton style='edit' onClick={() => router.push(`/lists/edit/${listId}`)} title='ベストを編集' />
                <ListCardButton style='delete' onClick={() => setShowModal(true)} title='ベストを削除' />
              </>
            ) : null}
            <ListCardButton style='tweet' onClick={(e) => e} title='ツイートする' tweetProps={{ themeTitle: theme.title, movies: movies }} />
          </div>
        </div>
      </div>
      {showModal ? (
        <ImportantModal
          showModal={showModal}
          title='このベストを削除しますか？'
          description={`タイトル: "${theme.title}"`}
          confirmationText='削除する'
          cancellationText='削除しない'
          handleConfirm={() => handleDelete()}
          handleCancel={() => setShowModal(false)}
        />
      ) : null}
    </>
  )
})

ListCard.displayName = 'ListCard'

export default ListCard
