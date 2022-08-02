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
  let cookies
  let data
  let endpoint
  let key
  switch (req.method) {
    case 'GET':
      if (req.query.endpoint) {
        endpoint = req.query.endpoint
        try {
          const response = await client.get(`/${endpoint}`)
          if (response.status === 200) {
            res.status(200).json(response.data)
            break
          } else {
            res.status(response.status).end()
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
      cookies = nookies.get({ req })
      data = req.body.data
      endpoint = req.body.endpoint
      key = req.body.key
      try {
        const response = await client.post(
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
        if (response.status === 200) {
          res.status(200).json(response.data)
          break
        } else {
          res.status(response.status).end()
          break
        }
      } catch (err) {
        res.status(500).json(err)
        break
      }

    case 'PATCH':
      cookies = nookies.get({ req })
      data = req.body.data
      endpoint = req.body.endpoint
      key = req.body.key
      try {
        const response = await client.patch(
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
        if (response.status === 200) {
          res.status(200).json(response.data)
          break
        } else {
          res.status(response.status).end()
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
