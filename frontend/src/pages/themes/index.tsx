import type { List, Theme } from 'interfaces/interface'
import type { GetStaticProps } from 'next'
import { client } from 'pages/api/v1/client'
import PopularThemes from 'components/themes/popularThemes'
import PageHead from 'components/layout/pageHead'
import FloatingButton from 'components/commons/floatingButton'
import { useRouter } from 'next/router'
import Headline from 'components/commons/headline'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
}

const Themes = (props: Props) => {
  const themes = props.themes
  const router = useRouter()
  return (
    <>
      <PageHead title='お題一覧' />
      <Headline>
        <h1>お題一覧</h1>
      </Headline>
      <div className='px-10 w-full'>
        <div className='flex flex-col flex-wrap items-center justify-center gap-3 w-full'>
          <PopularThemes themes={themes} />
        </div>
      </div>
      <FloatingButton onClick={() => router.push('/themes/new')} content={<>お題を作る</>} />
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

export default Themes
