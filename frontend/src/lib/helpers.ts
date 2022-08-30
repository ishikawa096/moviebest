import { toastError, toastInfo, toastWarn } from 'lib/toast'
import { NextRouter } from 'next/router'
import { useLayoutEffect, useState } from 'react'

export const isEmptyObject = (obj: { [key: string]: any }) => Object.keys(obj).length === 0

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

export const guestUserUnavailable = (router: NextRouter) => {
  router.back()
  toastWarn('ゲストユーザーは設定を変更できません')
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

export const sortByNewest = (data: Array<any>) => {
  const result = data.sort((a: typeof data[number], b: typeof data[number]) => (a.createdAt < b.createdAt ? 1 : -1))
  return result
}
