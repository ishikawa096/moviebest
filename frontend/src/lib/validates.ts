import type { CreateListParams, CreateThemeParams } from "interfaces/interface";

export const validateTheme = (theme: CreateThemeParams) => {
  const errors: { [K in keyof CreateThemeParams]?: string } = {}
  if (!theme.title.trim()) {
    errors.title = 'お題を入力してください'
  }
  if (theme.title.length > 100) {
    errors.title = `お題は100文字までです(現在:${theme.title.length}文字)`
  }
  if (theme.capacity < 2 || theme.capacity > 10) {
    errors.capacity = '作品数は2〜10です'
  }
  return errors
}

export const validateList = (list: CreateListParams) => {
  const errors: { [K in keyof CreateListParams]?: string } = {}
  list.movies?.map((m) => {
    if (m.title === '') {
    errors.movies = 'タイトルを入力してください'
    }
  })
  if (list.comment && list.comment.length > 1000) {
    errors.comment = `コメントは1000文字までです(現在:${list.comment.length}文字)`
  }
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
