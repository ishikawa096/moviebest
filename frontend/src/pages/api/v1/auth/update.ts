import { authHeaders, setCookies } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { client } from '../client'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = req.body
  const cookies = nookies.get({ req })
  try {
    const response = await client.put('/auth', params, { headers: authHeaders(cookies)})
    if (response.status === 200) {
      setCookies(response, { res })
      res.status(200).json(response.data)
    }
  } catch (err) {
    res.json(err)
  }
}

export default handler
