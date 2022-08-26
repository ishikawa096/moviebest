import { setCookies } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { client } from '../client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await client.post('/auth/guest_sign_in')
    if (response.status === 200) {
      setCookies(response, { res })
      res.json(response.data)
    }
  } catch (err) {
    if (err instanceof Error) {
      res.json(err)
    }
  }
}

export default handler
