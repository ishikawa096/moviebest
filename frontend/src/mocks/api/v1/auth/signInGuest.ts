import { userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const authUpdate: ResponseResolver<MockedRequest, typeof restContext> = async (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ status: 'success', data: userMock }))
}

export default authUpdate
