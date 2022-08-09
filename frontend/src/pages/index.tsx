import PageHead from 'components/layout/pageHead'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'
import ListsSlider from 'components/lists/listsSlider'
import PopularThemes from 'components/themes/popularThemes'
import LargeButton from 'components/commons/largeButton'
import { useRouter } from 'next/router'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
  lists: Array<List & { theme: Theme; user: User }>
}

const Home = (props: Props) => {
  const router = useRouter()
  const themes = props.themes
  const lists = props.lists.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0,11)
  themes.sort((a, b) => b.lists.length - a.lists.length)

  return (
    <>
      <PageHead />
      <section>
        <div className='mb-10 w-screen text-center bg-gradient-to-r from-yellow-300 to-orange-400 py-40'>
          <h1 className='mb-10 font-logo text-3xl'>映画なんでもベスト</h1>
          <h3 className='font-light'>お題に合わせて自分だけの映画ベストランキングを作ろう</h3>
        </div>
      </section>
      <section className='w-screen'>
        <div className='mb-5 w-full'>
          <div className='w-screen px-10 py-2 text-2xl text-bold'>
            <h2>🎥みんなの新着ベスト</h2>
          </div>
          <ListsSlider lists={lists} />
        </div>
        <div className='mb-10 flex justify-center'>
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
            <h2>💫人気のお題</h2>
          </div>
          <PopularThemes themes={themes} />
        </div>
        <div className='mb-10 flex flex-row items-center text-center justify-around gap-10'>
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
      <section>
        <h3 className='font-black text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>映画なんでもベストとは？</h3>
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
