import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'

interface Props {
  theme: Theme & { lists: Array<List & { user: User }> }
}

const ThemePage = (props: Props) => {
  const theme = props.theme
  const lists = theme.lists

  return (
    <div>
      <h1>お題タイトル: #{theme.title}</h1>
      <Link
        href={{
          pathname: '/lists/new',
          query: { id: theme.id },
        }}
      >
        <a>このお題で新規作成</a>
      </Link>
      <div>
        {lists.map((list) => (
          <div key={list.id}>
            <p>作成者：<Link href={`/users/${list.userId}`}><a>{list.user.name}</a></Link>さん</p>
            {list.movies.map((movie) => (
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
    const res = await client.get(`/themes/${id}`)
    const theme = res.data

    return { props: { theme: theme } }

  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } },
      }
    }
  }
}

export default ThemePage
