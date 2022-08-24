import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface HeadProps {
  title?: string
  thumbnailUrl?: string
  description?: string
}

const PageHead: NextPage<HeadProps> = ({ title, thumbnailUrl, description }) => {
  const router = useRouter()
  const siteName = '映画なんでもベスト'
  if (title === undefined) {
    title = siteName
  } else {
    title = `${title} - ${siteName}`
  }

  if (thumbnailUrl === undefined) {
    thumbnailUrl = '/asset/image/summary.png'
  }

  if (description === undefined) {
    description = '自由なお題で映画ミニランキングを作ろう'
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content={title} />
      <meta property='og:url' content={router.asPath} />
      <meta property='og:image' content={thumbnailUrl} />
      <meta property='og:description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

export default PageHead
