import { setCookies } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { client } from '../client'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await client.get('/auth/confirmation', { params: req.query })
    if (response.status === 200) {
      setCookies(response, { res })
      res.status(200).json(response.data)
    } else {
      res.status(response.status).json(response.data)
    }
  } catch (err) {
    if (err instanceof Error) {
      res.json(err)
    }
  }
}

export default handler
