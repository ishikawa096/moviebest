import { toastError, toastInfo, toastWarn } from 'lib/toast'
import { NextRouter } from 'next/router'
import { useLayoutEffect, useState } from 'react'

export const isEmptyObject = (obj: {} | { any: any }) => Object.keys(obj).length === 0

export const errorMessage = () => {
  toastError('エラーにより処理ができませんでした')
}

export const redirectToSignIn = (router: NextRouter) => {
  router.push('/signin')
  toastWarn('ログインが必要です')
}

export const alreadySignIn = (router: NextRouter) => {
  router.back()
  toastInfo('すでにログインしています')
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
