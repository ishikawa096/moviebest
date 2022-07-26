import type { AxiosResponse } from "axios"
import type { NextApiResponse, NextPageContext } from "next"
import { setCookie, destroyCookie } from "nookies"

export const setCookies = (res: AxiosResponse, ctx?: NextPageContext | { res: NextApiResponse }) => {
  const options = {
    maxAge: 14 * 24 * 60 * 60,
    path: '/',
  }
  setCookie(ctx, '_access_token', res.headers['access-token'], options)
  setCookie(ctx, '_client', res.headers['client'], options)
  setCookie(ctx, '_uid', res.headers['uid'], options)
}

export const destroyCookies = (ctx?: NextPageContext | { res: NextApiResponse }) => {
  const options = {
    path: '/',
  }
  destroyCookie(ctx, '_access_token', options)
  destroyCookie(ctx, '_client', options)
  destroyCookie(ctx, '_uid', options)
}
