import Image from 'next/image'
import { Movie, Theme } from 'interfaces/interface'
import { useWindowWidth } from 'lib/helpers'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { setImageUrl } from 'lib/tmdbHelpers'
import Poster from './poster'

const Posters = ({ movies, theme, blankImage }: { movies: Array<Movie>; theme: Theme; blankImage: string }) => {
  const [update, setUpdate] = useState(false)
  const [firstMovieImage, setFirstMovieImage] = useState(setImageUrl(movies[0]))
  const width = useWindowWidth()
  const [isWideWindow, SetIsWideWindow] = useState(false)

  useEffect(() => {
    if (width >= 640) {
      SetIsWideWindow(true)
    }
    if (width < 640) {
      SetIsWideWindow(false)
    }
  }, [width])

  const onError = () => {
    setFirstMovieImage(blankImage)
    setUpdate(!update)
  }

  return (
    <>
      {movies.map((movie) => (
        <Poster key={movie.id} movie={movie} blankImage={blankImage} />
      ))}
      {
        // グリッドに空ができる場合、埋める
        movies.length === 7 || (movies.length === 9 && isWideWindow) ? (
          <div className='relative flex justify-center overflow-hidden'>
            <div className='text-[0px]'>
              <Image src={firstMovieImage} alt={theme.title} layout='fill' objectFit='cover' placeholder='blur' blurDataURL='/342x509.png' onError={() => onError()} />

              <div className='p-5 text-base text-shadow flex flex-col justify-center text-center items-center top-0 left-0 right-0 bottom-0 absolute z-10 backdrop-blur-xl text-white'>
                <FontAwesomeIcon icon={faHashtag} size='sm' className='px-1' />
                {theme.title}
              </div>
            </div>
          </div>
        ) : null
      }

      {movies.length === 10 && !isWideWindow ? (
        <div className='col-span-2 relative flex justify-center overflow-hidden'>
          <div className='text-[0px]'>
            <Image src={firstMovieImage} alt={theme.title} layout='fill' objectFit='cover' placeholder='blur' blurDataURL='/342x509.png' onError={() => onError()} />

            <div className='p-5 text-base text-shadow flex flex-col justify-center text-center items-center top-0 left-0 right-0 bottom-0 absolute z-10 backdrop-blur-xl text-white'>
              <FontAwesomeIcon icon={faHashtag} size='sm' className='px-1' />
              {theme.title}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Posters
