import { Movie } from 'interfaces/interface'
import { toastWarn } from 'lib/toast'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const PostersContainer = ({ children, movies }: { children: ReactNode, movies: Array<Movie> }) => {
  const router = useRouter()
  const length =  movies.length
  if (length < 6) {
    return <div className='mb-10 flex flex-row flex-no-wrap justify-center w-screen bg-black'>{children}</div>
  }
  if (length === 6) {
    return (
      <div className='mb-10 flex justify-center w-screen bg-black'>
        <div className='grid grid-cols-3 gap-0 justify-center w-[fit-content]'>{children}</div>
      </div>
    )
  }
  if (length === 7 || length === 8) {
    return (
      <div className='mb-10 flex justify-center w-screen bg-black'>
        <div className='grid grid-cols-4 gap-0 justify-center w-[fit-content]'>{children}</div>
      </div>
    )
  }
  if (length === 9) {
    return (
      <div className='mb-10 flex justify-center w-screen bg-black'>
        <div className='grid grid-cols-3 sm:grid-cols-5 gap-0 justify-center w-[fit-content]'>{children}</div>
      </div>
    )
  }
  if (length === 10) {
    return (
      <div className='mb-10 flex justify-center w-screen bg-black'>
        <div className='grid grid-cols-4 sm:grid-cols-5 gap-0 justify-center w-[fit-content]'>{children}</div>
      </div>
    )
  } else {
    toastWarn('エラーが起きました。前のページに戻ります')
    router.back()
    return <></>
  }
}

export default PostersContainer
