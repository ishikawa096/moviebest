import { rest } from 'msw'
import mockTmdbSearch from './api/v1/tmdb'
import mockThemes from './api/v1/themes'
import mockLists from './api/v1/lists'
import authDelete from './api/v1/auth/delete'
import authUpdate from './api/v1/auth/update'
import signIn from './api/v1/auth/signIn'
import signUp from './api/v1/auth/signUp'
import signOut from './api/v1/auth/signOut'
import signInGuest from './api/v1/auth/signInGuest'

export const handlers = [
  rest.get('/api/v1/tmdb/search', mockTmdbSearch),
  rest.get('/api/v1/lists', mockLists),
  rest.get('/api/v1/themes', mockThemes),
  rest.post('/api/v1/themes', mockThemes),
  rest.post('/api/v1/auth/signup', signUp),
  rest.post('/api/v1/auth/signin', signIn),
  rest.post('/api/v1/auth/signinAsGuest', signInGuest),
  rest.put('/api/v1/auth/update', authUpdate),
  rest.delete('/api/v1/auth/signout', signOut),
  rest.delete('/api/v1/auth/delete', authDelete),
]
