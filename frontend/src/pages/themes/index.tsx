import type { Theme } from 'interfaces/interface'
import type { GetStaticProps } from 'next'
import { client } from 'pages/api/v1/client'
import Link from 'next/link'

interface Props {
  themes: Array<Theme>
}

const Themes = (props: Props) => {
  return (
    <>
      <h1>お題一覧</h1>
      <ul>
        {props.themes.map((theme) => (
          <li key={theme.id}>
            <Link href={`/themes/${encodeURIComponent(theme.id)}`}>
              <a>{theme.title}</a>
            </Link>
          </li>
        ))}
      </ul>
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
