import Image from 'next/image'
import { Movie, Theme } from 'interfaces/interface'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { setImageUrl } from 'lib/tmdbHelpers'
import Poster from './poster'

const BLUR_IMAGE = '/assets/images/342x509.png'

const FillingEmptyGrid = ({ length, mainMovie, title, blankImage }: { length: number; mainMovie: Movie; title: string; blankImage: string }) => {
  const [update, setUpdate] = useState(false)
  const [firstMovieImage, setFirstMovieImage] = useState<string>(setImageUrl(mainMovie))

  const onError = () => {
    setFirstMovieImage(blankImage)
    setUpdate(!update)
  }

  return (
    <div
      className={`
          ${
            length === 5 || length === 8 ? 'block sm:hidden' : length === 9 ? 'hidden sm:block' : length === 7 ? 'col-span-2 sm:col-span-1' : length === 10 ? 'col-span-2 sm:hidden' : 'hidden'
          } relative flex justify-center overflow-hidden`}
    >
      <div className='text-[0px]'>
        <Image src={firstMovieImage} alt={title} layout='fill' objectFit='cover' placeholder='blur' blurDataURL={BLUR_IMAGE} onError={() => onError()} />
        <div className='p-5 text-base drop-shadow-text flex flex-row justify-center text-center items-center top-0 left-0 right-0 bottom-0 absolute z-10 backdrop-blur-xl text-white'>
          <FontAwesomeIcon icon={faHashtag} size='sm' className='px-1' />
          {title}
        </div>
      </div>
    </div>
  )
}

const Posters = ({ movies, theme, blankImage }: { movies: Array<Movie>; theme: Theme; blankImage: string }) => {
  return (
    <>
      {movies.map((movie) => (
        <Poster key={'poster-' + movie.id} movie={movie} blankImage={blankImage} />
      ))}
      {movies.length < 5 ? null :
        <FillingEmptyGrid length={movies.length} mainMovie={movies[0]} title={theme.title} blankImage={blankImage} />
      }
    </>
  )
}

export default Posters
