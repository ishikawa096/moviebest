import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { authHeaders } from 'lib/api/authHelper'

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
  let endpoint
  let params
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
      endpoint = req.body.endpoint
      params = req.body.params
      try {
        const response = await client.post(
          `/${endpoint}`, params,
          {
            headers: authHeaders(cookies),
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
      endpoint = req.body.endpoint
      params = req.body.params
      try {
        const response = await client.patch(
          `/${endpoint}`, params,
          {
            headers: authHeaders(cookies),
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

    case 'DELETE':
      if (req.query.endpoint) {
        endpoint = req.query.endpoint
        cookies = nookies.get({ req })
        try {
          const response = await client.delete(`/${endpoint}`, {
            headers: authHeaders(cookies),
          })
          if (response.status === 200) {
            res.status(200).json(response.data)
            break
          } else {
            res.status(response.status).json(response.data)
            break
          }
        } catch (err) {
          res.status(500).send(err)
          break
        }
      } else {
        res.status(400).send('request query is invalid')
        break
      }

    default:
      res.status(405).end()
      break
  }
}

export default handler
