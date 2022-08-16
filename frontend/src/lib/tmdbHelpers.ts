import { Movie } from 'interfaces/interface'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/'

export const posterUrl = (posterPath: string, size: string) => `${POSTER_BASE_URL}${size}${posterPath}`

export const setImageUrl = (movie: Movie) => {
  const result = movie.tmdbImage ? posterUrl(movie.tmdbImage, 'w500') : '/noimage.png'
  return result
}
