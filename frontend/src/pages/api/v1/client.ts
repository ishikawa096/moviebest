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

const revalidatePaths = ['/', '/lists', '/themes']

export const revalidate = (res: NextApiResponse) => {
  revalidatePaths.map(async (path) => {
    await res.unstable_revalidate(path)
  })
}

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let cookies
  let path
  let params
  switch (req.method) {
    case 'GET':
      if (req.query.path) {
        path = req.query.path
        try {
          const response = await client.get(`${path}`)
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

    case 'POST':
      if (req.body.path && req.body.params) {
        cookies = nookies.get({ req })
        path = req.body.path
        params = req.body.params
        try {
          const response = await client.post(`${path}`, params, {
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

    case 'PATCH':
      if (req.body.path && req.body.params) {
        cookies = nookies.get({ req })
        path = req.body.path
        params = req.body.params
        try {
          const response = await client.patch(`${path}`, params, {
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

    case 'DELETE':
      if (req.query.path) {
        path = req.query.path
        cookies = nookies.get({ req })
        try {
          const response = await client.delete(`${path}`, {
            headers: authHeaders(cookies),
          })
          if (response.status === 200) {
            revalidate(res)
            res.status(200).json(response.data)
            break
          } else {
            res.status(response.status).json(response.data)
            break
          }
        } catch (err) {
          res.send(err)
          break
        }
      } else {
        res.status(400).send('request query is missing')
        break
      }

    default:
      res.status(405).end()
      break
  }
}

export default handler
