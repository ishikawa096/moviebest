import axios, { AxiosResponse } from 'axios'
import { parseCookies } from 'nookies'
import { SignUpParams, SignInParams, PasswordParams, UserEditParams, ConfirmationParams } from 'interfaces/interface'
import { errorMessage } from 'lib/helpers'
import { toastError } from 'lib/toast'

export const signUp = (params: SignUpParams) => {
  return axios.post('/api/v1/auth/signup', params)
}

export const signIn = (params: SignInParams) => {
  return axios.post('/api/v1/auth/signin', params)
}

export const guestSignIn = () => {
  return axios.post('/api/v1/auth/signinAsGuest')
}

export const confirmation = (params: ConfirmationParams) => {
  return axios.get('/api/v1/auth/confirmation', { params: params })
}

export const signOut = () => {
  return axios.delete('/api/v1/auth/signout')
}

export const putPassword = (params: PasswordParams) => {
  return axios.put('/api/v1/auth/update', params)
}

export const putUserUpdate = (params: UserEditParams) => {
  return axios.put('/api/v1/auth/update', params)
}

export const userDelete = () => {
  return axios.delete('/api/v1/auth/delete')
}

export const getCurrentUser = () => {
  const cookies = parseCookies()
  if (!cookies._access_token || !cookies._client || !cookies._uid) return
  return axios.get('/api/v1/auth/sessions')
}

export const authClient = async (args: { method: Promise<AxiosResponse<any, any>>; setIsSending?: React.Dispatch<React.SetStateAction<boolean>>; failMessage?: string }) => {
  try {
    const res = await args.method
    if (res.status === 200 && res.data.status === 'success') {
      return res.data
    } else {
      args.setIsSending?.(false)
      args.failMessage ? toastError(args.failMessage) : undefined
    }
  } catch (err) {
    args.setIsSending?.(false)
    errorMessage()
  }
}

export const signClient = async (args: { method: Promise<AxiosResponse<any, any>>; setIsSending?: React.Dispatch<React.SetStateAction<boolean>>; failMessage?: string }) => {
  try {
    const res = await args.method
    if (res.status === 200 && res.data.data) {
      return res.data
    } else {
      args.setIsSending?.(false)
      args.failMessage ? toastError(args.failMessage) : undefined
    }
  } catch (err) {
    args.setIsSending?.(false)
    errorMessage()
  }
}

export const signOutClient = async () => {
  try {
    const res = await signOut()
    if (res.data.success === true) {
      return res.data
    } else {
      toastError('ログアウトできませんでした')
    }
  } catch (err) {
    toastError('ログアウトできませんでした')
  }
}
