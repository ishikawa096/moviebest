import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { client } from 'pages/api/v1/client'
import { List, Theme } from 'interfaces/interface'

interface Props {
  lists: Array<{ id: number; type: string; attributes: List }>
  theme: Theme
}

const ThemePage = (props: Props) => {
  const lists = props.lists
    .map((list) => list.attributes)
    .map((list) => {
      return {
        id: list.id,
        comment: list.comment,
        numbered: list.numbered,
        movies: list.movies,
      }
    })
  const theme = props.theme

  return (
    <div>
      <h1>お題タイトル: #{theme.title}</h1>
      <Link
        href={{
          pathname: '/list/new',
          query: { themeId: theme.id, title: theme.title, cap: theme.capacity },
        }}
      >
        <a>このお題で新規作成</a>
      </Link>
      <div>
        {lists.map((list) => (
          <div key={list.id}>
            {list.movies?.map((movie) => (
              <div key={movie.id}>{movie.title}</div>
            ))}
            <p>{list.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id = context.params?.id
    const themeRes = await client.get(`/theme/${id}`)
    const theme = themeRes.data.data.attributes

    const listsRes = await client.get('/list', {
      params: {
        themeId: theme.id,
      },
    })
    const lists = listsRes.data.data

    return { props: { theme: theme, lists: lists } }

  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } },
      }
    }
  }
}

export default ThemePage
