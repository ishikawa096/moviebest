import type { GetServerSidePropsContext } from 'next'
import { client } from 'pages/api/v1/client'
import { List, Theme, User } from 'interfaces/interface'
import FloatingButton from 'components/commons/floatingButton'
import { useRouter } from 'next/router'
import ListsContainer from 'components/lists/listsContainer'
import PageHead from 'components/layout/pageHead'
import Headline from 'components/layout/headline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faFilePen } from '@fortawesome/free-solid-svg-icons'

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

  return (
    <>
      <PageHead title={theme.title + 'の一覧'} />
      <div>
        <Headline>
          <h1 className='italic text-3xl'>
            <FontAwesomeIcon icon={faHashtag} className='px-1' size='xs' />
            {theme.title}
          </h1>
        </Headline>
        <ListsContainer lists={lists} />
        <FloatingButton onClick={buttonHandler} content={<FontAwesomeIcon icon={faFilePen} />} />
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
