import { Movie, Theme, User } from 'interfaces/interface'
import Link from 'next/link'
import Image from 'next/image'
import { posterUrl } from 'lib/tmdbHelpers'
import { useState } from 'react'

const BLANK_IMAGE = '/342x509.png'
const MAX_TITLE_LENGTH = 20

interface Props {
  theme: Theme
  user: User
  movies: Array<Movie>
}

const ListCard = ({ theme, user, movies }: Props) => {
  const [update, setUpdate] = useState(false)
  const [image, setImage] = useState(movies[0].tmdbImage)

  const onError = () => {
    setImage('')
    update ? setUpdate(false) : setUpdate(true)
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
    <div key={movie.id} className='flex flex-row backdrop-blur-xl backdrop-brightness-3xl text-black rounded-sm overflow-hidden backdrop-saturate-[3]'>
      <div className={`text-center mr-[1px] flex font-sans w-5 bg-opacity-50  bg-white items-center text-gray-800 text-md ${movie.position + 1 >= 10 ? 'pl-0.5' : 'pl-1.5' }`}>{movie.position + 1}</div>
      <div className={`'pl-1 pr-3 py-1 flex items-center justify-center tracking-tighter w-full bg-opacity-50 bg-white whitespace-nowrap overflow-x-scroll text-gray-900 ${movie.title.length > 12 ? 'text-base' : 'text-xl' }`}>{titleOmit(movie.title)}</div>
    </div>
  ))

  return (
    <div className='relative flex flex-col w-80 sm:w-[22rem] h-[fit-content] min-h-[30rem] mr-auto ml-auto justify-center items-center rounded-xl overflow-hidden'>
      <Image
        src={image ? posterUrl(image, 'w500') : BLANK_IMAGE}
        alt={'このベストのメイン画像'}
        layout='fill'
        objectFit='cover'
        placeholder='blur'
        blurDataURL={BLANK_IMAGE}
        onError={() => onError()}
      />

      <div className='absolute flex flex-col w-full h-full z-10 rounded-2xl'>
        <Link href={`/themes/${theme.id}`}>
          <a>
            <div className='p-4 text-center text-xl text-white font-light backdrop-brightness-50 backdrop-blur-lg backdrop-saturate-[5] hover:underline'>
              <h1># {theme.title}</h1>
            </div>
          </a>
        </Link>
        <Link href={`/lists/${movies[0].listId}`}>
          <a className='contents'>
            <div className='flex flex-col justify-around h-full px-2 mb-10'>{listColumn}</div>
          </a>
        </Link>

        <div className='absolute bottom-0 flex flex-row justify-between w-full p-2 text-center text-white font-thin backdrop-brightness-50 backdrop-blur-lg backdrop-saturate-[5]'>
          <div>
            作成者：
            <Link href={`/users/${user.id}`}>
              <a className='hover:underline'>{user.name}</a>
            </Link>
          </div>
          <div>
            <a
              href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_APP_HOST}/lists/${movies[0].listId}&text=${movies
                .map((m) => `${m.position + 1}.%20${m.title}%0a`)
                .join('')}&hashtags=${theme.title}`}
              target='_blank'
              rel='noreferrer'
            >
              tweet
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCard
