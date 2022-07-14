export interface Theme {
  id: number
  title: string
  capacity?: number
  createdAt: string
  updatedAt: string
}

export interface Movie {
  id: number
  title: string
  position?: number
  listId: number
  createdAt: string
  updatedAt: string
}

export interface List {
  id: number
  comment?: string
  numbered: boolean
  createdAt: string
  updatedAt: string
  movies?: Array<Movie>
}

export interface user {
  id: number
  createdAt: string
  updatedAt: string
}
