import type { NextPage } from 'next'
import Head from 'next/head'

interface HeadProps {
  title?: string
  thumbnailUrl?: string
  description?: string
}

const PageHead: NextPage<HeadProps> = ({ title, thumbnailUrl, description }) => {
  const siteName = "EIGA NANDEMO BEST"
  if (title === undefined) {
    title = siteName
  } else {
    title = `${title} - ${siteName}`
  }

  if (thumbnailUrl === undefined) {
    thumbnailUrl = '';
  }

  if (description === undefined) {
    description = "EIGA NANDEMO BEST"
  }

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title}/>
      <meta property="og:image" content={thumbnailUrl}/>
      <meta property="og:description" content={description}/>
    </Head>
  )
}

export default PageHead
