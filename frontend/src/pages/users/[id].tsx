import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'

interface Props {
  user: User & { lists: Array<List & { theme: Theme }> }
}

const UserPage = (props: Props) => {
  const user = props.user
  const lists = user.lists //.map((list) => list.attributes)
  // .map((list) => {
  //   return {
  //     id: list.id,
  //     comment: list.comment,
  //     numbered: list.numbered,
  //     movies: list.movies,
  //   }
  // })

  return (
    <div>
      <h1>ユーザー名 {user.name}</h1>
      <div>
        {lists.map((list) => (
          <div key={list.id}>
            <Link
              href={{
                pathname: `/themes/${list.themeId}`,
                query: { id: list.themeId },
              }}
            >
              <a>{list.theme.title}</a>
            </Link>
            {list.movies?.map((movie) => (
              <div key={movie.id}>{movie.title}</div>
            ))}
            <p>コメント：{list.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const id = context.params?.id
    const res = await client.get(`/users/${id}`)
    const user = res.data

    // const listsRes = await client.get('/lists', {
    //   params: {
    //     userId: id,
    //   },
    // })
    // const lists = listsRes.data.data

    return { props: { user: user } }
  } catch (err) {
    if (err instanceof Error) {
      return {
        props: { error: { message: err.message } },
      }
    }
  }
}

export default UserPage
