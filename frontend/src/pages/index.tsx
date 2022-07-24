import type { GetStaticProps } from 'next'
import Link from 'next/link'
import PageHead from 'components/layout/pageHead'
import { client } from './api/v1/client'

interface Props {
  themes: Array<{ id: number; title: string }>
}

const Home = (props: Props) => {
  const themes = props.themes
  const ThemesPool = () => {
    return (
      <ul>
        {themes.map((theme) => (
          <li key={theme.id}>
            <Link href={`/themes/${theme.id}`}>
              <a>{theme.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <PageHead />
      <div>
        <section>
          <h1 className='text-3xl font-bold underline'>MOVIE ANYTHING BEST</h1>

          <ThemesPool />

          <Link href={'/themes'}>
            <a>
              <h2>お題をもっと見る</h2>
            </a>
          </Link>
          <Link href={'/themes/new'}>
            <a>
              <h2>新しいお題を作る</h2>
            </a>
          </Link>
        </section>
        <section>
          <h3 className='font-black text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
            お題に合わせて自分だけの映画ベストランキングを作ろう
          </h3>
        </section>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.get('/themes/popular')
  const data = response.data
  return {
    props: { themes: data },
    revalidate: 60,
  }
}

export default Home
