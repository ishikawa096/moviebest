import { toastError } from 'lib/toast'
import { useLayoutEffect, useState } from 'react'

export const isEmptyObject = (obj: {} | { any: any }) => Object.keys(obj).length === 0

export const handleAxiosError = (err: Error) => {
  toastError('Something went wrong...')
  console.error(err)
}

export const arrayRandom = (array: Array<any>) => {
  const random = array[Math.floor(Math.random() * array.length)]
  return random
}

export const useWindowWidth = (): number => {
  const [size, setSize] = useState(0)
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize(window.innerWidth)
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
