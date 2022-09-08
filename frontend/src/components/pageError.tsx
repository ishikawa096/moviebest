import Headline from 'components/layout/headline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonPraying, faCat } from '@fortawesome/free-solid-svg-icons'

const PageError = ({ error }: { error?: number | string }) => {
  let code
  let text = 'エラーが発生しました'

  if (typeof error === 'number') {
    code = error
    switch (error) {
      case 404:
        text = 'ページが見つかりませんでした'
        break

      case 500:
        text = 'サーバーエラーが発生しました'
        break
    }
  } else if (typeof error === 'string') {
    text = error
  }

  return (
    <>
      <Headline>
        <h1>Sorry...</h1>
      </Headline>

      <div className='flex flex-col items-center px-5 md:px-32 text-sky-600'>
        <div className='bg-white w-full rounded-lg flex flex-col md:items-center p-5 md:p-10'>
          <div className='text-xl font-bold text-center'>
            <FontAwesomeIcon icon={faPersonPraying} className='text-7xl' />
            <FontAwesomeIcon icon={faCat} className='text-6xl' />
            {code}
          </div>
          <div className='flex flex-col gap-10 pt-10 items-center text-sm text-gray-500'>{text}</div>
        </div>
      </div>
    </>
  )
}

export default PageError
