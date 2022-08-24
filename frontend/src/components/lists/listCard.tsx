import { Movie, Theme, User } from 'interfaces/interface'
import Link from 'next/link'
import Image from 'next/image'
import { setImageUrl } from 'lib/tmdbHelpers'
import { useState } from 'react'
import TweetIcon from './tweetIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faHashtag } from '@fortawesome/free-solid-svg-icons'

const BLANK_IMAGE = '/asset/image/noimage.png'
const MAX_TITLE_LENGTH = 20

interface Props {
  theme: Theme
  user: User
  movies: Array<Movie>
}

const ListCard = ({ theme, user, movies }: Props) => {
  const [update, setUpdate] = useState(false)
  const [image, setImage] = useState(setImageUrl(movies[0]))

  const onError = () => {
    setImage(BLANK_IMAGE)
    setUpdate(!update)
  }

  const titleOmit = (title: string) => {
    if (title.length > MAX_TITLE_LENGTH + 1) {
      const result = title.substring(0, MAX_TITLE_LENGTH) + '…'
      return result
    } else {
      return title
    }
  }

  const listColumn = movies.map((movie) => (
    <div key={'list-column-' + movie.id} className='flex flex-row text-white rounded-sm overflow-hidden'>
      <div
        className={`text-center mr-[1px] flex font-sans w-5 items-center text-sm sm:text-base bg-opacity-50 bg-gray-400 backdrop-blur-xl backdrop-saturate-[10] ${movie.position + 1 >= 10 ? 'pl-0.5' : 'pl-1.5'}`}
      >
        {movie.position + 1}
      </div>
      <div
        className={`'pl-1 py-1 sm:py-1 flex items-center justify-center tracking-tighter whitespace-nowrap w-full bg-opacity-50 bg-gray-400 backdrop-blur-xl backdrop-saturate-[10] ${
          movie.title.length > 12 ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
        }`}
      >
        {titleOmit(movie.title)}
      </div>
    </div>
  ))

  return (
    <>
      <div className='relative flex flex-col w-72 sm:w-[22rem] h-[fit-content] min-h-[25rem] sm:min-h-[30rem] mr-auto ml-auto justify-center items-center rounded-xl overflow-hidden hover:shadow-lg duration-150'>
        <Image
          src={image}
          alt={movies[0] + 'の画像'}
          layout='fill'
          objectFit='cover'
          placeholder='blur'
          blurDataURL={BLANK_IMAGE}
          onError={() => onError()}
        />

        <div className='absolute flex flex-col w-full h-full z-10 rounded-2xl'>
          <Link href={`/themes/${theme.id}`}>
            <a>
              <div className='p-3 sm:p-4 text-center text-lg sm:text-xl text-white bg-opacity-50 bg-gray-400 backdrop-blur-xl backdrop-saturate-[10] hover:underline'>
                <h1>
                  <FontAwesomeIcon icon={faHashtag} className='px-1' size='sm' />{theme.title}
                </h1>
              </div>
            </a>
          </Link>
          <Link href={`/lists/${movies[0].listId}`}>
            <a className='contents'>
              <div className='flex flex-col justify-around h-full px-1 sm:px-2 mb-8 sm:mb-10'>{listColumn}</div>
            </a>
          </Link>

          <div className='absolute bottom-0 flex flex-row justify-between w-full text-center text-white font-light bg-opacity-50 bg-gray-400 backdrop-blur-xl backdrop-saturate-[10]'>
            <div className='p-1 sm:p-2'>
              <Link href={`/users/${user.id}`}>
                <a className='hover:underline'>
                  <FontAwesomeIcon icon={faUser} className='px-1' />
                  {user.name}
                </a>
              </Link>
            </div>
            <TweetIcon themeTitle={theme.title} movies={movies} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ListCard
