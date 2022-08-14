import { authHeaders, destroyCookies } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { client } from '../client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = nookies.get({ req })
  try {
    const response = await client.delete('/auth/sign_out', {
      headers: authHeaders(cookies),
    })
    if (response.data.success === true) {
      destroyCookies({ res })
      res.json(response.data)
    }
  } catch (err) {
    res.json(err)
  }
}

export default handler
