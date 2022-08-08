import Image from 'next/image'
import { Movie, Theme } from 'interfaces/interface'

const Posters = ({ movies, theme, images, blankImage, onError }: { movies: Array<Movie>, theme: Theme, images: Array<string>, blankImage: string, onError: (m: Movie) => void }) => (
  <>
    {movies.map((movie) => (
      <div key={movie.id} className='relative flex justify-center overflow-hidden max-w-[342px]'>
        <div>
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

          {images[movie.position] !== blankImage ? (
            <div
              className='p-5 flex flex-col justify-center text-center items-center
                  top-0 left-0 right-0 bottom-0 absolute z-10
                  backdrop-blur-sm backdrop-brightness-50
                  text-white opacity-0 hover:opacity-100
                  transition-all duration-500'
            >
              {movie.title}
            </div>
          ) : (
            <div
              className='p-5 flex flex-col justify-center text-center items-center
                  top-0 left-0 right-0 bottom-0 absolute z-10
                  backdrop-blur-sm backdrop-brightness-50
                  text-white text-2xl'
            >
              {movie.title}
            </div>
          )}
        </div>
      </div>
    ))}
    {
      // グリッドに空ができる場合、埋める
      movies.length === 7 || (movies.length === 9 && window.innerWidth >= 640) ? (
        <div className='relative flex justify-center overflow-hidden w-full h-full items-center text-white bg-black'>#{theme.title}</div>
      ) : null
    }

    {movies.length === 10 && window.innerWidth < 640 ? (
      <div className='relative flex justify-center overflow-hidden w-full h-full items-center text-white bg-black col-span-2'>#{theme.title}</div>
    ) : null}
  </>
)

export default Posters
