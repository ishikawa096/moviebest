import { Movie } from 'interfaces/interface'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/'

const NO_IMAGE_PIC = '/asset/image/noimage.png'

export const posterUrl = (posterPath: string, size: string) => `${POSTER_BASE_URL}${size}${posterPath}`

export const setImageUrl = (movie: Movie) => {
  const result = movie.tmdbImage ? posterUrl(movie.tmdbImage, 'w500') : NO_IMAGE_PIC
  return result
}
