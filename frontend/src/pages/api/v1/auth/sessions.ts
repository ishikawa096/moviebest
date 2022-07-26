import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { client } from '../client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = nookies.get({ req })
  try {
    const response = await client.get(`/auth/sessions`, {
      headers: {
        'access-token': cookies._access_token,
        client:cookies. _client,
        uid: cookies._uid,
      },
    })
    if (response.status === 200) {
      res.status(200).json(response.data)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export default handler
