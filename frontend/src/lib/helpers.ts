import { toastError } from 'lib/toast'

export const isEmptyObject = (obj: {} | { any: any }) => Object.keys(obj).length === 0

export const handleAxiosError = (err: Error) => {
  toastError('Something went wrong...')
  console.error(err)
}
