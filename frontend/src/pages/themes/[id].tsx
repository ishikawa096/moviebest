import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'
import FloatingButton from 'components/commons/floatingButton'
import { useRouter } from 'next/router'
import ListsContainer from 'components/lists/listsContainer'

interface Props {
  theme: Theme & { lists: Array<List & { user: User, theme?: Theme }> }
}

const ThemePage = (props: Props) => {
  const router = useRouter()
  const theme = props.theme
  const lists = theme.lists.map((l) => ({ ...l, theme: theme }))

  const buttonHandler = () => {
    router.push({
      pathname: '/lists/new',
      query: { id: theme.id },
    })
  }

  const buttonContent = (
    <>
      このお題で
      <br />
      新規作成
    </>
  )

  return (
    <div>
      <div className='w-screen py-14 px-10 text-center text-bold text-3xl underline bg-white'>
        <Link
          href={{
            pathname: '/lists/new',
            query: { id: theme.id },
          }}
        >
          <a># {theme.title}</a>
        </Link>
      </div>
          <ListsContainer lists={lists} />
      {/* <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 px-2 grid-flow-row-dense'>
        {lists.map((list) => (
          <div key={list.id}>
            <ListCard user={list.user} movies={list.movies} theme={theme} />
          </div>
        ))}
      </div> */}
      <FloatingButton onClick={buttonHandler} content={buttonContent} />
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
