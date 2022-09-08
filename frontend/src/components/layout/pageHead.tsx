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
    thumbnailUrl = process.env.NEXT_PUBLIC_APP_HOST + '/assets/images/summary.webp'
  }

  if (description === undefined) {
    description = '自由なお題で映画ミニランキングを作ろう'
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:url' content={process.env.NEXT_PUBLIC_APP_HOST + router.asPath} />
      <meta property='og:image' content={thumbnailUrl} />
      <meta property='og:description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

export default PageHead
