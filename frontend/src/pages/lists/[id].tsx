import Link from 'next/link'
import { useRouter } from 'next/router'
import { List, Theme, User } from 'interfaces/interface'
import PostersContainer from 'components/lists/postersContainer'
import Posters from 'components/lists/posters'
import FloatingButton from 'components/commons/floatingButton'
import ListCard from 'components/lists/listCard'
import PageHead from 'components/layout/pageHead'
import TweetButton from 'components/commons/tweetButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { getList } from 'lib/fetcher'
import PageError from 'components/pageError'
import NowLoading from 'components/commons/nowLoading'

const BLANK_IMAGE = '/assets/images/noimage.png'

const ListPage = () => {
  const router = useRouter()
  const listId = Number(router.query.id)
  const [isError, setIsError] = useState(false)
  const [list, setList] = useState<(List & { user: User; theme: Theme }) | undefined>()

  const fetchData = async () => {
    try {
      const res = await getList(listId)
      if (res.status !== 200 || res.data.status) {
        setIsError(true)
      } else {
        setList(res.data)
      }
    } catch (err) {
      setIsError(true)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (listId) {
        fetchData()
      } else {
        setIsError(true)
      }
    }
  }, [])

  const buttonHandler = () => {
    router.push({
      pathname: '/lists/new',
      query: { id: list?.theme.id },
    })
  }

  if (isError) {
    return <PageError />
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

        <FloatingButton onClick={buttonHandler} content={<FontAwesomeIcon icon={faPlus} />} />
      </>
    )
  }
}

export default ListPage
