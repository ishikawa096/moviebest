import axios from 'axios'
import { CreateListParams, CreateThemeParams, UpdateMovieParams } from 'interfaces/interface'

export const getTheme = (id: number) => {
  return axios.get('/api/v1/themes', { params: { id: id } })
}

export const getThemes = () => {
  return axios.get('/api/v1/themes')
}

export const postTheme = (theme: CreateThemeParams) => {
  return axios.post('/api/v1/themes', { params: { theme: theme } })
}

export const getList = (id: number) => {
  return axios.get('/api/v1/lists', { params: { id: id } })
}

export const postList = (list: CreateListParams) => {
  return axios.post('/api/v1/lists', { params: { list: list } })
}

export const patchList = (id: number, list: Omit<CreateListParams, 'themeId'> & { movies: Array<UpdateMovieParams> }) => {
  return axios.patch('/api/v1/lists', { id, params: { list: list } })
}

export const deleteList = (id: number) => {
  return axios.delete('/api/v1/lists', { params: { id: id } })
}

export const getUser = (id: number) => {
  return axios.get('/api/v1/users', { params: { id: id } })
}

export const getTmdbSearch = (keyword: string) => {
    return axios.get('/api/v1/tmdb/search', { params: { keyword: keyword } })
}
