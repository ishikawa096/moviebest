import { authHeaders } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { client } from '../client'
import { revalidate } from '../client'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = nookies.get({ req })
  try {
    const response = await client.delete('/auth', { headers: authHeaders(cookies) })
    if (response.status === 200) {
      revalidate(res)
      res.status(200).json(response.data)
    } else {
      res.status(response.status).json(response.data)
    }
  } catch (err) {
    res.json(err)
  }
}

export default handler
