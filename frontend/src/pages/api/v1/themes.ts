import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { authHeaders } from 'lib/api/authHelper'
import { client, revalidate } from './client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const path = req.query.id ? `/themes/${req.query.id}` : '/themes'
      try {
        const response = await client.get(path)
        if (response.status !== 200) throw Error(response.statusText)
        res.status(200).json(response.data)
        break
      } catch (err) {
        res.send(err)
        break
      }
    }

    case 'POST': {
      if (req.body.params) {
        const cookies = nookies.get({ req })
        const params = req.body.params
        try {
          const response = await client.post('/themes', params, {
            headers: authHeaders(cookies),
          })
          if (response.status !== 200) throw Error(response.statusText)
          revalidate(res)
          res.status(200).json(response.data)
          break
        } catch (err) {
          res.send(err)
          break
        }
      } else {
        res.status(400).send('request body is missing')
        break
      }
    }

    default:
      res.status(405).end()
      break
  }
}

export default handler
