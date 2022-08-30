import { listMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const mockList: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(listMock))
}

export default mockList
