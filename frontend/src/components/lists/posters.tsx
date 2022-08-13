import Image from 'next/image'
import { Movie, Theme } from 'interfaces/interface'
import { useWindowWidth } from 'lib/helpers'
import { useEffect, useState } from 'react'

const Posters = ({ movies, theme, images, blankImage, onError }: { movies: Array<Movie>; theme: Theme; images: Array<string>; blankImage: string; onError: (m: Movie) => void }) => {
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

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className='relative flex justify-center overflow-hidden max-w-[342px]'>
          <div className='text-[0px]'>
            <Image
              src={images[movie.position]}
              alt={`${movie.title}のポスター画像`}
              width={342}
              height={509}
              objectFit='cover'
              placeholder='blur'
              blurDataURL='/342x509.png'
              onError={() => onError(movie)}
            />

            <div
              className={`${
                images[movie.position] !== blankImage ? 'opacity-0 hover:opacity-100 transition-all duration-500 text-base' : 'text-2xl'
              } p-5 flex flex-col justify-center text-center items-center top-0 left-0 right-0 bottom-0 absolute z-10 backdrop-blur-sm backdrop-brightness-50 text-white
                  `}
            >
              {movie.title}
            </div>
          </div>
        </div>
      ))}
      {
        // グリッドに空ができる場合、埋める
        movies.length === 7 || (movies.length === 9 && isWideWindow) ? (
        <div className='relative flex justify-center overflow-hidden'>
          <div className='text-[0px]'>
            <Image
              src={images[0]}
              alt={theme.title}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              blurDataURL='/342x509.png'
              onError={() => onError(movies[0])}
            />

            <div className='p-5 text-base text-shadow flex flex-col justify-center text-center items-center top-0 left-0 right-0 bottom-0 absolute z-10 backdrop-blur-xl text-white' >
              #{theme.title}
            </div>
          </div>
        </div>) : null
      }

      {movies.length === 10 && !isWideWindow ?
        <div className='col-span-2 relative flex justify-center overflow-hidden'>
          <div className='text-[0px]'>
            <Image
              src={images[0]}
              alt={theme.title}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              blurDataURL='/342x509.png'
              onError={() => onError(movies[0])}
            />

            <div className='p-5 text-base text-shadow flex flex-col justify-center text-center items-center top-0 left-0 right-0 bottom-0 absolute z-10 backdrop-blur-xl text-white' >
              #{theme.title}
            </div>
          </div>
        </div> : null}
    </>
  )
}

export default Posters
