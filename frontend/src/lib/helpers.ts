import { toastError } from 'lib/toast'

export const isEmptyObject = (obj: {} | { any: any }) => Object.keys(obj).length === 0

export const handleAxiosError = (err: Error) => {
  toastError('Something went wrong...')
  console.error(err)
}

export const arrayRandom = (array: Array<any>) => {
  const random = array[Math.floor(Math.random() * array.length)]
  return random
}

export const randomColor = () => {
  const colors = ['bg-yellow-400', 'bg-red-400', 'bg-blue-400']
  return arrayRandom(colors)
}
