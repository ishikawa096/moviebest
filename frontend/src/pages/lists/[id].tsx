import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import client from 'lib/api/client'
import { List, Theme, User } from 'interfaces/interface'

interface Props {
  list: List & { user: User; theme: Theme }
}

const ListPage = (props: Props) => {
  const list = props.list
  const theme = list.theme
  const movies = list.movies.sort((a, b) => a.position - b.position)
  const user = list.user

  return (
    <div>
      <h1>リストタイトル: #{theme.title}</h1>
      <Link
        href={{
          pathname: '/lists/new',
          query: { id: theme.id },
        }}
      >
        <a>このお題で新規作成</a>
      </Link>
      <div>
        作成者：
        <Link href={`/users/${user.id}`}>
          <a>{user.name}</a>
        </Link>
      </div>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div>{movie.title}</div>
          </div>
        ))}
        <p>コメント：{list.comment}</p>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id = context.params?.id
    const res = await client.get(`/lists/${id}`)
    const list = res.data

    return { props: { list: list } }

  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } },
      }
    }
  }
}

export default ListPage
