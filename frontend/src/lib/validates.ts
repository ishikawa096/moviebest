import type { createListParams, CreateThemeParams } from "interfaces/interface";

export const validateTheme = (theme: CreateThemeParams) => {
  const errors: { [K in keyof CreateThemeParams]?: string } = {}
  if (theme.title === '') {
    errors.title = 'お題を入力してください'
  }
  return errors
}

export const validateList = (list: createListParams) => {
  // type Movies = 'movies'
  // const errors: { [K in keyof Omit<List, Movies>]?: string } & { movies?: Array<string> } = {}
  const errors: { [K in keyof createListParams]?: string } = {}
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
