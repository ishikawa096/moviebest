import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { client } from 'pages/api/v1/client'
import { List, Movie, Theme, User } from 'interfaces/interface'
import { posterUrl } from 'lib/tmdbHelpers'
import { useState } from 'react'
import PostersContainer from 'components/lists/postersContainer'
import Posters from 'components/lists/posters'
import FloatingButton from 'components/commons/floatingButton'
import ListCard from 'components/lists/listCard'
import PageHead from 'components/layout/pageHead'
import HeaderButton from 'components/commons/headerButton'
import TweetButton from 'components/commons/tweetButton'

const BLANK_IMAGE = '/342x509.png'

interface Props {
  list: List & { user: User; theme: Theme }
}

const ListPage = (props: Props) => {
  const router = useRouter()
  const list = props.list
  const theme = list.theme
  const movies = list.movies.sort((a, b) => a.position - b.position)
  const user = list.user
  const [update, setUpdate] = useState(false)

  const DefaultImagePath = () => {
    const imagePaths = movies.map((m) => m.tmdbImage)
    const result = imagePaths.map((image) => (image ? posterUrl(image, 'w500') : BLANK_IMAGE))
    return result
  }

  const [images, setImages] = useState<Array<string>>(DefaultImagePath)

  const buttonHandler = () => {
    router.push({
      pathname: '/lists/new',
      query: { id: theme.id },
    })
  }

  const buttonContent = (
    <>
      同じお題で
      <br />
      新規作成
    </>
  )

  const onError = (movie: Movie) => {
    const prevImages = images
    prevImages[movie.position] = BLANK_IMAGE
    setImages(prevImages)
    update ? setUpdate(false) : setUpdate(true)
  }

  return (
    <>
      <PageHead title={user.name + 'さんの' + theme.title} />
      <div className='flex flex-col px-3 py-5 text-center italic w-full underline'>
        <h3 className='mb-2 text-sm md:text-base lg:text-md px-2 py-1 w-full'>
          <Link href={`/users/${list.userId}`}>
            <a className='decoration-orange-500 hover:text-orange-600 hover:decoration-6 duration-150'>{user.name} さんの</a>
          </Link>
        </h3>
        <h2 className='text-3xl md:text-4xl lg:text-5xl px-2 py-1'>
          <Link href={`/themes/${theme.id}`}>
            <a className='decoration-orange-500 hover:text-orange-600 duration-150'># {theme.title}</a>
          </Link>
        </h2>
      </div>
      <PostersContainer movies={movies}>
        <Posters movies={movies} theme={theme} images={images} blankImage={BLANK_IMAGE} onError={onError} />
      </PostersContainer>
      <div className='w-full flex justify-center mb-6'>
        <TweetButton themeTitle={theme.title} movies={movies} />
      </div>
      <div className='flex flex-col lg:flex-row justify-start mb-20 mx-40 rounded-lg items-center'>
        <div>
          <ListCard theme={theme} user={user} movies={movies} />
        </div>

        <div className='flex flex-col min-h-[10rem] min-w-[20rem] w-full p-3 mb-20 mt-10 lg:ml-10 bg-white text-center text-gray-700 rounded-lg'>
          <div className='text-sm p-3'>COMMENT</div>
          <hr />
          <div className='px-2 py-3'>{list.comment}</div>
        </div>
      </div>

      <FloatingButton onClick={buttonHandler} content={buttonContent} />
    </>
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
