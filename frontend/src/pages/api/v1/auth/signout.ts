import { destroyCookies } from 'lib/api/authHelper'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { client } from '../client'

export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = nookies.get({ req })
  try {
    const response = await client.delete('/auth/sign_out', {
    headers: {
        'access-token': cookies._access_token,
        client:cookies. _client,
        uid: cookies._uid,
    },
  })
    if (response.data.success === true) {
      destroyCookies({ res })
      res.send(JSON.stringify(response.data))
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export default handler
