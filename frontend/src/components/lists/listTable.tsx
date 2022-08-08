import { Movie, Theme, User } from 'interfaces/interface'
import Link from 'next/link'
import Image from 'next/Image'

interface Props {
  theme: Theme
  user: User
  movies: Array<Movie>
}

const ListTable = ({ theme, user, movies }: Props) => {
  const listColumn = movies.map((movie) => (
    <li key={movie.id} className='border-b-4 p-4'>
      {movie.title}
    </li>
  ))

  return (
    <div className='flex flex-col max-w-3xl mb-20 mr-auto ml-auto justify-center items-center border-4 border-b-0'>
      <div className='w-full border-b-4'>
        <div className='p-2 text-center'>
          <Link href={`/users/${user.id}`}>
            <a>{user.name}</a>
          </Link>
          さんの
        </div>
        <div className='p-4 text-center text-2xl'>
          <h1 className=''># {theme.title}</h1>
        </div>
      </div>
      <div className='w-full text-center'>
        <ul className='text-xl'>{listColumn}</ul>
      </div>
    </div>
  )
}

export default ListTable
