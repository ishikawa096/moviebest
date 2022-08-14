import { authHeaders } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { client } from '../client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = nookies.get({ req })
  try {
    const response = await client.get(`/auth/sessions`, {
      headers: authHeaders(cookies),
    })
    if (response.status === 200) {
      res.status(200).json(response.data)
    }
  } catch (err) {
    res.json(err)
  }
}

export default handler
