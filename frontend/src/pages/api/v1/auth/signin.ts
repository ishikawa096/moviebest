import { setCookies } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { client } from '../client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = req.body
  try {
    const response = await client.post('/auth/sign_in', params)
    if (response.status === 200) {
      setCookies(response, { res })
      res.send(JSON.stringify(response.data))
    }
  } catch (err) {
    if (err instanceof Error) {
      res.json(err)
    }
  }
}

export default handler
