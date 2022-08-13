import PageHead from 'components/layout/pageHead'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'
import ListsSlider from 'components/lists/listsSlider'
import PopularThemes from 'components/themes/popularThemes'
import LargeButton from 'components/commons/largeButton'
import { useRouter } from 'next/router'
import Image from 'next/image'
import About from 'components/about'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRankingStar, faFilm } from '@fortawesome/free-solid-svg-icons'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
  lists: Array<List & { theme: Theme; user: User }>
}

const Home = (props: Props) => {
  const router = useRouter()
  const themes = props.themes
  const lists = props.lists.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 8)
  themes.sort((a, b) => b.lists.length - a.lists.length)

  return (
    <>
      <PageHead />
      <section>
        <div className='relative justify-center mb-10 w-screen h-[80vh] text-center'>
          <div className='text-[0px]'>
            <Image src={'/Kander.svg'} alt='背景画像' priority={true} layout='fill' objectFit='cover' />
          </div>
          <div className='p-5 flex flex-col justify-center text-center items-center bg-white absolute top-[30%] bottom-[30%] right-0 left-0 md:top-0 md:bottom-0 md:right-[30%] md:left-[30%] min-w-[10rem] z-10'>
            <h1 className='mb-10 font-logo text-3xl whitespace-nowrap'>
              映画<span className='text-2xl'>なんでも</span>ベスト
            </h1>
            <h3 className='font-light'>お題に合わせて自分だけの映画ベストランキングを作ろう</h3>
          </div>
        </div>
      </section>
      <section className='w-screen'>
        <div className='mb-5 w-full'>
          <div className='w-screen px-10 py-2 text-2xl text-bold'>
            <FontAwesomeIcon icon={faFilm} className='px-1' />
            みんなの新着ベスト
          </div>
          <ListsSlider lists={lists} />
        </div>
        <div className='mb-32 flex justify-center'>
          <LargeButton
            title='新着をもっと見る'
            onClick={() => {
              router.push('/lists')
            }}
          />
        </div>
      </section>
      <section>
        <div className='mb-5'>
          <div className='w-screen px-10 py-2 text-2xl text-bold'>
            <FontAwesomeIcon icon={faRankingStar} className='px-1' />
            人気のお題
          </div>
          <PopularThemes themes={themes} />
        </div>
        <div className='mb-32 flex flex-col md:flex-row items-center text-center justify-around gap-10'>
          <LargeButton
            title='お題をもっと見る'
            onClick={() => {
              router.push('/themes')
            }}
          />
          <LargeButton
            title='お題をつくる'
            onClick={() => {
              router.push('/themes/new')
            }}
          />
        </div>
      </section>
      <section id='about'>
        <About />
      </section>
      <section>
        <div className='py-20 my-10 mx-30 py-5 px-10  md:px-28 lg:px-40 w-full flex flex-col text-center items-center bg-white text-gray-700'>
          <h3 className='mb-10 text-3xl font-bold'>はじめよう</h3>
          <div className='flex flex-col md:flex-row gap-5'>
            <LargeButton
              title='ログイン'
              onClick={() => {
                router.push('/signin')
              }}
            />
            <LargeButton
              title='新規登録'
              onClick={() => {
                router.push('/signup')
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const themesRes = await client.get('/themes')
    const themes = themesRes.data
    const listsRes = await client.get('/lists')
    const lists = listsRes.data
    return {
      props: { themes: themes, lists: lists },
      revalidate: 60,
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } },
      }
    }
  }
}

export default Home
