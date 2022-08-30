import { Movie } from 'interfaces/interface'
import { arrayRandom } from 'lib/helpers'
import { setImageUrl } from 'lib/tmdbHelpers'
import Image from 'next/image'
import { useState } from 'react'

const COLOR_IMAGES_BASE = '/assets/images/colors'

interface Props {
  movie: Movie
  blankImage: string
}

const Poster = ({ movie, blankImage }: Props) => {
  const [update, setUpdate] = useState(false)
  const [image, setImage] = useState(setImageUrl(movie))

  const setRandomBlurImage = () => {
    const numbers = [...Array(5)].fill(null).map((_, i) => i + 1)
    const number = arrayRandom(numbers)
    return COLOR_IMAGES_BASE + `/gr${number}.webp`
  }

  const onError = () => {
    setImage(blankImage)
    setUpdate(!update)
  }

  return (
    <div className='relative flex justify-center overflow-hidden max-w-[342px]'>
      <div className='text-[0px]'>
        <Image src={image} alt={`${movie.title}のポスター画像`} width={342} height={509} objectFit='cover' placeholder='blur' blurDataURL={setRandomBlurImage()} onError={() => onError()} priority={true} />

        <div
          className={`${
            image !== blankImage ? 'opacity-0 hover:opacity-100 transition-all duration-500 text-xs md:text-base' : 'text-base md:text-2xl'
          } p-1 md:p-5 flex flex-col justify-center text-center items-center top-0 left-0 right-0 bottom-0 absolute z-10 backdrop-blur-sm backdrop-brightness-50 text-white
                  `}
        >
          {movie.title}
        </div>
      </div>
    </div>
  )
}
export default Poster
