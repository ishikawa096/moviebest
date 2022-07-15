import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { client } from 'pages/api/v1/client'
import { List, Theme } from 'interfaces/interface'

interface Props {
  list: List
  theme: Theme
}

const ListPage = (props: Props) => {
  const theme = props.theme
  const list = props.list
  const movies = list.movies.sort((a, b) => a.position - b.position)

  return (
    <div>
      <h1>リストタイトル: #{theme.title}</h1>
      <Link
        href={{
          pathname: '/list/new',
          query: { themeId: theme.id, title: theme.title, cap: theme.capacity },
        }}
      >
        <a>このお題で新規作成</a>
      </Link>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div>{movie.title}</div>
          </div>
        ))}
        <p>{list.comment}</p>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id = context.params?.id
    const listRes = await client.get(`/list/${id}`)
    const list = listRes.data.data.attributes

    const themeId = list.themeId
    const themeRes = await client.get(`/theme/${themeId}`)
    const theme = themeRes.data.data.attributes

    return { props: { list: list, theme: theme } }

  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } }
      }
    }
  }
}

export default ListPage
