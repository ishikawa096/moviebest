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
import { sortByNewest } from 'lib/helpers'
import { useMemo } from 'react'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
  lists: Array<List & { theme: Theme; user: User }>
}

const BG_IMAGE = '/assets/images/Kander.svg'
const LOGO_IMAGE = '/assets/images/logo.webp'
const THEMES_MAX_COUNT = 15
const LISTS_MAX_COUNT = 8

const Home = (props: Props) => {
  const router = useRouter()
  const themes = useMemo(() => props.themes.sort((a, b) => b.lists.length - a.lists.length).slice(0, THEMES_MAX_COUNT), [props.themes])
  const lists = useMemo(() => sortByNewest(props.lists).slice(0, LISTS_MAX_COUNT), [props.lists])

  return (
    <>
      <PageHead />
      <section>
        <div className='relative justify-center mb-10 w-screen h-[80vh] text-center overflow-hidden'>
          <div className='text-[0px] bg-white'>
            <Image src={BG_IMAGE} alt='背景画像' priority={true} layout='fill' objectFit='cover' />
          </div>
          <div className='p-5 flex flex-col justify-center text-center items-center bg-white absolute top-1/2 bottom-1/2 right-1/3 left-1/3 z-10'>
            <h1 className='mb-10 min-w-[18rem] md:min-w-[30rem] lg:min-w-[40rem] bg-white whitespace-nowrap px-5 py-7 md:px-20 md:py-14 lg:px-32 lg:py-16 drop-shadow-[30px_30px_0px_rgba(0,30,50,0.50)] motion-safe:animate-fadeIn'>
              <Image src={LOGO_IMAGE} alt='映画なんでもベスト' width={676} height={139} />
            </h1>
          </div>
          <p className='absolute font-light italic top-3/4 left-1/4 md:left-1/3 right-5 z-10 bg-white px-3 py-2 md:px-10 md:py-5 drop-shadow-[30px_30px_0px_rgba(0,30,50,0.50)]'>
            お題 に合わせて
            <span className='underline decoration-orange-500 underline-offset-4 decoration-2 decoration-wavy'>自分だけの映画ベストランキング</span>を作ろう
          </p>
        </div>
      </section>
      <section className='w-screen'>
        <h2 className='w-screen px-3 md:px-10 py-2 text-2xl text-bold'>
          <FontAwesomeIcon icon={faFilm} className='px-1' />
          みんなの新着ベスト
        </h2>
        <ListsSlider lists={lists} />
        <div className='mb-32 mt-8 flex justify-center'>
          <LargeButton
            title='新着をもっと見る'
            onClick={() => {
              router.push('/lists')
            }}
          />
        </div>
      </section>
      <section>
        <h2 className='block w-screen px-3 md:px-10 py-2 text-2xl text-bold'>
          <FontAwesomeIcon icon={faRankingStar} className='px-1' />
          人気のお題
        </h2>
        <PopularThemes themes={themes} />
        <div className='mb-32 mt-8 flex flex-col md:flex-row items-center text-center justify-around gap-10'>
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
        <div className='relative min-h-[28rem] py-20 mx-30 py-5 px-10  md:px-28 lg:px-40 w-full flex flex-col text-center items-center bg-white text-gray-700'>
          <div className='text-[0px] bg-white'>
            <Image src={BG_IMAGE} alt='背景画像' priority={true} layout='fill' objectFit='cover' />
          </div>
          <div className='p-5 flex flex-col justify-center text-center items-center absolute top-1/2 bottom-1/2 z-10'>
            <h3 className='mb-10 text-3xl font-light bg-white italic  px-10 py-7 drop-shadow-[30px_30px_0px_rgba(0,30,50,0.50)] '>はじめよう</h3>
            <div className='flex flex-col md:flex-row gap-10 md:gap-5 drop-shadow-[30px_30px_0px_rgba(0,30,50,0.50)]'>
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
