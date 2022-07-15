import type { Theme, List, Movie } from "interfaces/interface";

export const validateTheme = (theme: Theme) => {
  const errors: { [K in keyof Theme]?: string } = {}
  if (theme.title === '') {
    errors.title = 'お題を入力してください'
  }
  return errors
}

export const validateList = (list: List) => {
  // type Movies = 'movies'
  // const errors: { [K in keyof Omit<List, Movies>]?: string } & { movies?: Array<string> } = {}
  const errors: { [K in keyof List]?: string } = {}
  list.movies?.map((m) => {
    if (m.title === '') {
    errors.movies = 'タイトルを入力してください'
  }
})
  // validateMovies(list.movies)
  return errors
}

// export const validateMovies = (movies?: Array<Movie>) => {
//   type Movies = 'movies'
//   const errors: { movies?: Array<string> } = {}
//   movies?.map((m, i) => {
//     if (m.title === '') {
//     errors.movies = 'タイトルを入力してください'
//   }
// })
//   return errors
// }
