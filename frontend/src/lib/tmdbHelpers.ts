const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/'

export const posterUrl = (posterPath: string, size: string) =>
  `${POSTER_BASE_URL}${size}${posterPath}`
