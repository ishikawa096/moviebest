import type { AxiosResponse } from "axios"
import type { NextPageContext } from "next"
import { setCookie, destroyCookie } from "nookies"

export const setCookies = (res: AxiosResponse, ctx?: NextPageContext) => {
  const cookieOptions = {
    maxAge: 14 * 24 * 60 * 60,
  }
  setCookie(ctx, '_access_token', res.headers['access-token'], cookieOptions)
  setCookie(ctx, '_client', res.headers['client'], cookieOptions)
  setCookie(ctx, '_uid', res.headers['uid'], cookieOptions)
}

export const destroyCookies = (ctx?: NextPageContext) => {
  destroyCookie(ctx, '_access_token')
  destroyCookie(ctx, '_client')
  destroyCookie(ctx, '_uid')
}
