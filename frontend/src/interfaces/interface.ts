export interface Theme {
  id: number
  title: string
  capacity: number
  createdAt: string
  updatedAt: string
}

export interface CreateThemeParams {
  title: string
  capacity: number
}

export interface Movie {
  id: number
  title: string
  position: number
  listId: number
  createdAt: string
  updatedAt: string
}

export interface createMovieParams {
  title: string
  position: number
}

export interface List {
  id: number
  comment?: string
  numbered: boolean
  themeId: number
  userId: number
  createdAt: string
  updatedAt: string
  movies: Array<Movie>
}

export interface createListParams {
  comment?: string
  numbered: boolean
  themeId: number
  movies: Array<createMovieParams>
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInParams {
  email: string
  password: string
}
