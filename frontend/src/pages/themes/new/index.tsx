import type { Theme } from 'interfaces/interface'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PageHead from 'components/layout/pageHead'
import axios from 'axios'
import { handleAxiosError } from 'lib/helpers'
import { toastSuccess } from 'lib/toast'

const ThemeForm = dynamic(() => import('components/themeForm'), {
  ssr: false,
})

const NewTheme = () => {
  const router = useRouter()

  const createTheme = async (newData: { theme: Theme }) => {
    try {
      const response = await axios.post('/api/v1/client', {
        data: newData.theme,
        endpoint: 'themes',
        key: 'theme',
      })
      if (response.status !== 200) throw Error(response.statusText)
      const savedTheme = response.data.data.attributes
      toastSuccess('お題が作成されました')
      router.push({
        pathname: '/lists/new',
        query: { themeId: savedTheme.id, title: savedTheme.title, cap: savedTheme.capacity },
      })
    } catch (error) {
      if (error instanceof Error) {
        handleAxiosError(error)
      }
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
