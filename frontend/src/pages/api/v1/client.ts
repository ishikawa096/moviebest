import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.BACKEND_API_HOST,
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
    },
  }),
  { ignoreHeaders: true }
)

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      if (req.query.endpoint) {
        const endpoint = req.query.endpoint
        try {
          const getResponse = await client.get(`/${endpoint}`)
          if (getResponse.status === 200) {
            res.status(200).json(getResponse.data)
            break
          } else {
            res.status(getResponse.status).end()
          }
        } catch (err) {
          res.status(500).json(err)
          break
        }
      } else {
        res.status(400).end()
        break
      }

    case 'POST':
      const cookies = nookies.get({ req })
      const { data, endpoint, key } = req.body
      try {
        const postResponse = await client.post(
          `/${endpoint}`,
          {
            [key]: data,
          },
          {
            headers: {
              'access-token': cookies._access_token,
              client: cookies._client,
              uid: cookies._uid,
            },
          }
        )
        if (postResponse.status === 200) {
          res.status(200).json(postResponse.data)
          break
        } else {
          res.status(postResponse.status).end()
          break
        }
      } catch (err) {
        res.status(500).json(err)
        break
      }

    default:
      res.status(405).end()
      break
  }
}

export default handler
