import type { List, Theme, User } from 'interfaces/interface'
import type { GetStaticProps } from 'next'
import { client } from 'pages/api/v1/client'
import ListsContainer from 'components/lists/listsContainer'
import Headline from 'components/layout/headline'
import PageHead from 'components/layout/pageHead'
import { sortByNewest } from 'lib/helpers'

interface Props {
  lists: Array<List & { user: User; theme: Theme }>
}

const Lists = (props: Props) => {
  const lists = sortByNewest(props.lists)

  return (
    <>
      <PageHead title='新着ベスト' />
        <Headline>
          <h1>新着ベスト</h1>
        </Headline>
        <ListsContainer lists={lists} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.get('/lists')
  const data = response.data
  return {
    props: { lists: data }
  }
}

export default Lists
