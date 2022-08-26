import { userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const authUpdate: ResponseResolver<MockedRequest, typeof restContext> = async (req, res, ctx) => {
  const { currentPassword } = await req.json()

  if (currentPassword === 'mistake') {
    return res(ctx.status(200), ctx.json({ status: '422', message: 'Request failed with status code 422', code: 'ERR_BAD_REQUEST' }))
  } else {
    return res(ctx.status(200), ctx.json({ status: 'success', data: userMock }))
  }
}

export default authUpdate
