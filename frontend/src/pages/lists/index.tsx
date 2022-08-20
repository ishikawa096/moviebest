import type { List, Theme, User } from 'interfaces/interface'
import type { GetStaticProps } from 'next'
import { client } from 'pages/api/v1/client'
import Link from 'next/link'
import ListsContainer from 'components/lists/listsContainer'
import Headline from 'components/layout/headline'
import PageHead from 'components/layout/pageHead'

interface Props {
  lists: Array<List & { user: User; theme: Theme }>
}

const Lists = (props: Props) => {
  const lists = props.lists
  lists.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return (
    <>
      <PageHead title='新着ベスト' />
      <div className='w-full'>
        <Headline>
          <h1>新着ベスト</h1>
        </Headline>
        <ListsContainer lists={lists} />
      </div>
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
