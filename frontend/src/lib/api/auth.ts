import axios from 'axios'
import { parseCookies } from 'nookies'
import { SignUpParams, SignInParams } from 'interfaces/interface'

export const signUp = (params: SignUpParams) => {
  return axios.post('/api/v1/auth/signup', params)
}

export const signIn = (params: SignInParams) => {
  return axios.post('/api/v1/auth/signin', params)
}

export const guestSignIn = () => {
  return axios.post('/api/v1/auth/signinAsGuest')
}

export const signOut = () => {
  return axios.delete('/api/v1/auth/signout')
}

export const userDelete = () => {
  return axios.delete('/api/v1/auth/delete')
}

export const getCurrentUser = () => {
  const cookies = parseCookies()
  if (!cookies._access_token || !cookies._client || !cookies._uid) return
  return axios.get('/api/v1/auth/sessions')
}
