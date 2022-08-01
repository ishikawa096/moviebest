import type { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { client } from 'pages/api/v1/client'
import { List, Movie, Theme, User } from 'interfaces/interface'
import { posterUrl } from 'lib/tmdbHelpers'
import { ReactNode, useState } from 'react'

interface Props {
  list: List & { user: User; theme: Theme }
}

const BLANK_IMAGE = '/342x509.png'

const ListPage = (props: Props) => {
  const router = useRouter()
  const list = props.list
  const theme = list.theme
  const movies = list.movies.sort((a, b) => a.position - b.position)
  const user = list.user
  const [update, setUpdate] = useState(false)

  const DefaultImagePath = () => {
    const imagePaths = movies.map((m) => m.tmdbImage)
    const result = imagePaths.map((image) => (image ? posterUrl(image, 'w342') : BLANK_IMAGE))
    return result
  }

  const [images, setImages] = useState<Array<string>>(DefaultImagePath)

  const buttonHandler = () => {
    router.push({
      pathname: '/lists/new',
      query: { id: theme.id },
    })
  }

  const onError = (movie: Movie) => {
    const prevImages = images
    prevImages[movie.position] = BLANK_IMAGE
    setImages(prevImages)
    update ? setUpdate(false) : setUpdate(true)
  }

  // 画像リンク切れのとき自動フェッチ→レコード更新？
  // const imageHandler = async (movie: Movie) => {
  //   if (movie.tmdbId) {
  //     const res = await axios.get('/api/v1/tmdb/images', { params: { tmdbId: movie.tmdbId } })
  //     if (res.status === 200) {
  //       const posters = res.data.posters
  //       const poster = arrayRandom(posters)
  //       const newPath: string = poster.filePath
  //       return newPath
  //     } else {
  //       return '/342x509.png'
  //     }
  //   } else {
  //     return '/342x509.png'
  //   }
  // }

  const PostersContainer = ({ children }: { children: ReactNode }) => {
    if (movies.length < 6) {
      return <div className='mb-10 flex flex-row flex-no-wrap justify-center w-screen bg-black'>{children}</div>
    }
    if (movies.length === 6) {
      return (
        <div className='mb-10 flex justify-center w-screen bg-black'>
          <div className='grid grid-cols-3 gap-0 justify-center w-[fit-content]'>{children}</div>
        </div>
      )
    }
    if (movies.length === 7 || movies.length === 8) {
      return (
        <div className='mb-10 flex justify-center w-screen bg-black'>
          <div className='grid grid-cols-4 gap-0 justify-center w-[fit-content]'>{children}</div>
        </div>
      )
    }
    if (movies.length === 9) {
      return (
        <div className='mb-10 flex justify-center w-screen bg-black'>
          <div className='grid grid-cols-3 sm:grid-cols-5 gap-0 justify-center w-[fit-content]'>{children}</div>
        </div>
      )
    }
    if (movies.length === 10) {
      return (
        <div className='mb-10 flex justify-center w-screen bg-black'>
          <div className='grid grid-cols-4 sm:grid-cols-5 gap-0 justify-center w-[fit-content]'>{children}</div>
        </div>
      )
    } else {
      return <div>エラーが起きました</div>
    }
  }

  const Posters = () => (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className='relative flex justify-center overflow-hidden max-w-[342px]'>
          <>
            <Image
              src={images[movie.position]}
              alt={`${movie.title}のポスター画像`}
              width={342}
              height={509}
              objectFit='cover'
              placeholder='blur'
              blurDataURL='/342x509.png'
              onError={() => onError(movie)}
            />
            {images[movie.position] !== BLANK_IMAGE ? (
              <div
                className='p-5 flex flex-col justify-center text-center items-center
                  top-0 left-0 right-0 bottom-0 absolute z-10
                  backdrop-blur-sm backdrop-brightness-50
                  text-white opacity-0 hover:opacity-100
                  transition-all duration-500'
              >
                {movie.title}
              </div>
            ) : (
              <div
                className='p-5 flex flex-col justify-center text-center items-center
                  top-0 left-0 right-0 bottom-0 absolute z-10
                  backdrop-blur-sm backdrop-brightness-50
                  text-white text-2xl'
              >
                {movie.title}
              </div>
            )}
          </>
        </div>
      ))}
      {
        // グリッドに空ができる場合、埋める
        movies.length === 7 || (movies.length === 9 && window.innerWidth >= 640) ? (
          <div className='relative flex justify-center overflow-hidden w-full h-full items-center text-white bg-black'>#{theme.title}</div>
        ) : null
      }

      {movies.length === 10 && window.innerWidth < 640 ? (
        <div className='relative flex justify-center overflow-hidden w-full h-full items-center text-white bg-black col-span-2'>#{theme.title}</div>
      ) : null}
    </>
  )

  const listTable = movies.map((movie) => (
    <li key={movie.id} className='border-b-4 p-4'>
      {movie.title}
    </li>
  ))

  return (
    <div className=''>
      <div className=''>
        <div className='w-screen py-1 px-10 text-center text-black text-lg underline bg-white'>
          <Link href={`/themes/${theme.id}`}>
            <a># {theme.title}</a>
          </Link>
        </div>
        <PostersContainer>
          <Posters />
        </PostersContainer>

        <div className='flex flex-col max-w-3xl mb-20 mr-auto ml-auto justify-center items-center border-4 border-b-0'>
          <div className='w-full border-b-4'>
            <div className='p-2 text-center'>
              <Link href={`/users/${user.id}`}>
                <a>{user.name}</a>
              </Link>
              さんの
            </div>
            <div className='p-4 text-center text-2xl'>
              <h1 className=''># {theme.title}</h1>
            </div>
          </div>
          <div className='w-full text-center'>
            <ul className='text-xl'>{listTable}</ul>
          </div>
        </div>
      </div>

      <hr />
      <div className='h-30 p-10 mb-20 text-center'>コメント(仮){list.comment}</div>
      <hr />

      <button
        onClick={buttonHandler}
        title='同じお題で新規作成'
        className='fixed z-[90] bottom-10 right-8 bg-cyan-500
          w-40 h-20 rounded-full drop-shadow-sm flex justify-center items-center text-white text-lg
          hover:-translate-y-1 hover:scale-110 hover:bg-sky-400 duration-150 ease-in-out'
      >
        同じお題で
        <br />
        新規作成
      </button>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id = context.params?.id
    const res = await client.get(`/lists/${id}`)
    const list = res.data

    return { props: { list: list } }
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } },
      }
    }
  }
}

export default ListPage
