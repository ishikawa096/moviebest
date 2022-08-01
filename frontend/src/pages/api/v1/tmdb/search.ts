import { client } from '../client'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.keyword) {
    const keyword = req.query.keyword
    try {
      const response = await client.get('/tmdb/search', { params: { keyword: keyword } })
      if (response.status === 200) {
        res.status(200).json(response.data)
      } else {
        res.status(response.status).json(response.data)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(400).json({ message: 'keyword is missing' })
  }
}

export default handler
