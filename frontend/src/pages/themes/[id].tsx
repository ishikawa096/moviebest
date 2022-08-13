import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'
import FloatingButton from 'components/commons/floatingButton'
import { useRouter } from 'next/router'
import ListsContainer from 'components/lists/listsContainer'
import PageHead from 'components/layout/pageHead'
import Headline from 'components/commons/headline'

interface Props {
  theme: Theme & { lists: Array<List & { user: User; theme?: Theme }> }
}

const ThemePage = (props: Props) => {
  const router = useRouter()
  const theme = props.theme
  const lists = theme.lists.map((l) => ({ ...l, theme: theme }))
  lists.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

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
      投稿
    </>
  )

  return (
    <>
      <PageHead title={theme.title + 'の一覧'} />
      <div>
        <Headline>
          <h1 className='italic underline decoration-orange-500 text-3xl'># {theme.title}</h1>
        </Headline>
        <ListsContainer lists={lists} />
        <FloatingButton onClick={buttonHandler} content={buttonContent} />
      </div>
    </>
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
