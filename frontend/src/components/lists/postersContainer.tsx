import { Movie } from 'interfaces/interface'
import { ReactElement } from 'react'

const PostersContainer = ({ children, movies }: { children: ReactElement; movies: Array<Movie> }) => {
  const length = movies.length
  return (
    <div className='mb-10 flex flex-row flex-no-wrap justify-center w-screen bg-gray-100'>
      {length < 4 ? (
        <>{children}</>
      ) : (
        <div
          className={`
          ${length === 4 ? 'grid-cols-2 sm:flex sm:flex-row' : 'grid-cols-3'}
            ${length === 6 ? '' : length === 7 || length === 8 ? 'sm:grid-cols-4' : 'sm:grid-cols-5'} grid gap-0 justify-center w-[fit-content]`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default PostersContainer
