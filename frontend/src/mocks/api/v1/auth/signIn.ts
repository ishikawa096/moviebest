import { userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const authUpdate: ResponseResolver<MockedRequest, typeof restContext> = async (req, res, ctx) => {
  const { password } = await req.json()

  if (password === 'mistake') {
    return res(ctx.status(200), ctx.json({ status: '401', message: 'Request failed with status code 401', code: 'ERR_BAD_REQUEST' }))
  } else {
    return res(ctx.status(200), ctx.json({ status: 'success', data: userMock }))
  }
}

export default authUpdate
