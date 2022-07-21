import client from 'lib/api/client'
import { parseCookies } from "nookies"
import { SignUpParams, SignInParams } from 'interfaces/interface'

export const signUp = (params: SignUpParams) => {
  return client.post('auth', params)
}

export const signIn = (params: SignInParams) => {
  return client.post('auth/sign_in', params)
}

export const signOut = () => {
  const cookies = parseCookies()
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': cookies._access_token,
      client: cookies._client,
      uid: cookies._uid,
    },
  })
}

export const getCurrentUser = () => {
  const cookies = parseCookies()
  if (!cookies._access_token || !cookies._client || !cookies._uid) return
  return client.get('/auth/sessions', {
    headers: {
      'access-token': cookies._access_token,
      client: cookies._client,
      uid: cookies._uid,
    },
  })
}
