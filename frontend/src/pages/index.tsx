import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '/styles/Home.module.css'
import { Theme } from 'interfaces/interface'
import PageHead from 'components/layout/pageHead'
import { client } from './api/v1/client'

interface Props {
  themes: Array<{ id: number, title: string }>
}

const Home = (props: Props) => {
  const themes = props.themes
  const ThemesPool = () => {
    return (
      <ul>
        {themes.map((theme) => (
          <li key={theme.id}>
            <Link href={`/themes/${encodeURIComponent(theme.id)}`}>
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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className='text-3xl font-bold underline'>
          MOVIE ANYTHING BEST
        </h1>

        <ThemesPool />

        <Link href={'/themes/new'}>
          <a><h2>新しいお題を作る</h2></a>
        </Link>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href='https://github.com/vercel/next.js/tree/canary/examples' className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' className={styles.card}>
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' target='_blank' rel='noopener noreferrer'>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.get('/themes')
  const data = response.data
  return {
    props: { themes: data },
    revalidate: 60,
  }
}

export default Home
