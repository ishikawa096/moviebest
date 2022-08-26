import { listMock, themeMock, userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const mockTheme: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(themeMock))
}

export default mockTheme
