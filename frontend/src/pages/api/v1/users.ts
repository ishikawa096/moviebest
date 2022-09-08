import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { client } from './client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const { id } = req.query
      if (id) {
        try {
          const response = await client.get(`/users/${id}`)
          if (response.status !== 200) throw Error(response.statusText)
          res.status(200).json(response.data)
          break
        } catch (err) {
          res.send(err)
          break
        }
      } else {
        res.status(400).send('request query is missing')
        break
      }
    }

    default:
      res.status(405).end()
      break
  }
}

export default handler
