import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PageHead from 'components/layout/pageHead'
import axios from 'axios'
import type { List } from 'interfaces/interface'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'

const ListForm = dynamic(() => import('components/listForm'), {
  ssr: false,
})

const NewList = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (router.isReady) { setIsLoading(false) }
  }, [router])

  const createList = async (newData: { list: List }) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/v1/client', {
        data: newData.list,
        endpoint: 'list',
      })
      if (response.status !== 200) throw Error(response.statusText)

      const savedList = response.data
      toastSuccess('リストが作成されました')
      router.push(`/list/${savedList.id}`)
    } catch (error: any) {
      handleAxiosError(error);
    }
  }

  return (
    <>
      {isLoading ? (<p>Now Loading...</p>) : (
        <>
          <PageHead title='新規リスト作成' />
          <h2>新しいリストを作る</h2>
          <ListForm onSave={createList} />
        </>
      )}
    </>
  )
}

export default NewList
