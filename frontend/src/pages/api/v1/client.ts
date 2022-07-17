import axios from 'axios'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const client = axios.create({
  baseURL: process.env.BACKEND_API_HOST,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, endpoint, key } = req.body
  switch (req.method) {
    case 'POST':
      try {
        const postResponse = await client.post(`/${endpoint}`, {
          [key]: data
        })
        if (postResponse.status === 200) {
          res.status(200).json(postResponse.data)
          break
        }
      } catch(err) {
        res.status(500).json(err)
        break
      }
    default:
      res.status(405).end()
      break
  }
}

export default handler
