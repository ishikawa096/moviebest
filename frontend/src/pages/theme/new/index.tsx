import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PageHead from 'components/layout/pageHead'
import client from 'lib/api/client'

const ThemeForm = dynamic(() => import('components/themeForm'), {
  ssr: false,
})

const NewTheme = () => {
  const router = useRouter()

  const createTheme = async (newData: { theme: { title: string, capacity: number } }) => {
    try {
      const response = await client.post('/theme', {
        theme: newData.theme,
      })
      if (response.status !== 200) throw Error(response.statusText)
      const savedTheme = response.data.data.attributes
      router.push({
        pathname: '/list/new',
        query: { themeId: savedTheme.id, title: savedTheme.title, cap: savedTheme.capacity },
      })
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <>
      <PageHead title='新規お題作成' />
      <h1>新しいお題を作る</h1>
      <ThemeForm onSave={createTheme} />
    </>
  )
}

export default NewTheme
