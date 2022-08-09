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
    <div>
      <div>
        <div className='w-screen py-1 px-10 text-center text-black text-lg underline bg-white'>
          <Link href={`/themes/${theme.id}`}>
            <a># {theme.title}</a>
          </Link>
        </div>
        <PostersContainer movies={movies}>
          <Posters movies={movies} theme={theme} images={images} blankImage={BLANK_IMAGE} onError={onError} />
        </PostersContainer>
      </div>
      <ListCard theme={theme} user={user} movies={movies} />
      <hr />
      <div className='h-30 p-10 mb-20 text-center'>コメント(仮){list.comment}</div>
      <hr />

      <FloatingButton onClick={buttonHandler} content={buttonContent} />
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
