import type { List, Theme, User } from 'interfaces/interface'
import type { GetStaticProps } from 'next'
import { client } from 'pages/api/v1/client'
import Link from 'next/link'
import ListsContainer from 'components/lists/listsContainer'

interface Props {
  lists: Array<List & { user: User; theme: Theme }>
}

const Lists = (props: Props) => {
  const lists = props.lists
  lists.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return (
    <>
      <div className='px-10 w-full'>
        <div className='mb-5 w-full px-10 py-2 text-2xl text-bold'>
          <h2>💫新着ベスト</h2>
        </div>
        <ListsContainer lists={lists} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.get('/lists')
  const data = response.data
  return {
    props: { lists: data },
    revalidate: 60,
  }
}

export default Lists
