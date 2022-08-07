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
  tmdbId: number
  tmdbImage: string
  createdAt: string
  updatedAt: string
}

export interface CreateMovieParams {
  title: string
  position: number
  tmdbId?: number
  tmdbImage?: string
}

export interface MovieSelectOption {
  label: string
  value: string
  posterPath: string
  tmdbId?: number
}

export interface List {
  id: number
  comment: string
  numbered: boolean
  themeId: number
  userId: number
  createdAt: string
  updatedAt: string
  movies: Array<Movie>
}

export interface CreateListParams {
  comment?: string
  numbered: boolean
  themeId: number
  movies: Array<CreateMovieParams>
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

export interface PasswordParams {
  currentPassword: string
  password: string
  passwordConfirmation: string
}

export interface ModalProps {
  showModal: boolean,
  title: string,
  description: string,
  confirmationText: string,
  cancellationText: string,
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>,
  handleCancel: React.MouseEventHandler<HTMLButtonElement>
}
