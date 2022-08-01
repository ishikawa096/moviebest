import { client } from '../client'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.tmdbId) {
    const tmdbId = req.query.tmdbId
    try {
      const response = await client.get('/tmdb/images', { params: { tmdbId: tmdbId } })
      if (response.status === 200) {
        res.status(200).json(response.data)
      } else {
        res.status(response.status).json(response.data)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(400).json({ message: 'Movie ID is missing' })
  }
}

export default handler
