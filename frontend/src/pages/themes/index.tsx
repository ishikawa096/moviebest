import type { List, Theme } from 'interfaces/interface'
import type { GetStaticProps } from 'next'
import { client } from 'pages/api/v1/client'
import PopularThemes from 'components/themes/popularThemes'
import PageHead from 'components/layout/pageHead'
import FloatingButton from 'components/commons/floatingButton'
import { useRouter } from 'next/router'
import Headline from 'components/layout/headline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
      <PopularThemes themes={themes} />
      <FloatingButton onClick={() => router.push('/themes/new')} content={<FontAwesomeIcon icon={faPlus} />} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.get('/themes')
  const data = response.data
  return {
    props: { themes: data },
  }
}

export default Themes
