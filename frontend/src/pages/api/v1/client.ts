import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.BACKEND_API_HOST,
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
    },
  }),
  { ignoreHeaders: true }
)

const revalidatePaths = ['/', '/lists', '/themes']

export const revalidate = (res: NextApiResponse) => {
  revalidatePaths.map(async (path) => {
    await res.unstable_revalidate(path)
  })
}

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(400).end()
}

export default handler
