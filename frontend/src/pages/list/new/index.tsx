import { useState, useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PageHead from 'components/layout/pageHead'
import client from 'lib/api/client'
// import ListForm from 'components/ListForm'

const ListForm = dynamic(() => import('components/listForm'), {
  ssr: false,
})

const NewList = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) { setIsLoading(false) }
  }, [router])

  const createList = async (newData: { list: { comment: string, numbered: boolean, themeId: number, movies: Array<{ title: string, position: number}> } }) => {
    try {
      setIsLoading(true)
      const response = await client.post('/list', {
        // theme: newData.theme,
        list: newData.list,
        // theme: JSON.stringify(newList.theme),
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        // },
      })
      if (response.status !== 200) throw Error(response.statusText)

      const savedList = response.data
      router.push(`/list/${savedList.id}`)
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <>
      {isLoading ? (<p>Now Loading...</p>) : (
        <>
          <PageHead title='新規リスト作成' />
          <h2>new form</h2>
          <ListForm onSave={createList} />
        </>
      )}
    </>
  )
}

export default NewList
