import { Movie } from 'interfaces/interface'
import { ReactNode } from 'react'

const PostersContainer = ({ children, movies }: { children: ReactNode; movies: Array<Movie> }) => {
  const length = movies.length
  if (length < 6) {
    return <div className='mb-10 flex flex-row flex-no-wrap justify-center w-screen bg-gray-900'>{children}</div>
  } else {
    return (
      <div className='mb-10 flex justify-center w-screen bg-gray-900'>
        <div
          className={`${
            length === 6 ? 'grid-cols-3' : length === 7 || length === 8 ? 'grid-cols-4' : length === 9 ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-4 sm:grid-cols-5'
          } grid gap-0 justify-center w-[fit-content]`}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default PostersContainer
