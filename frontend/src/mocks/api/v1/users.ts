import { listMock, themeMock, userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const mockUser: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      ...userMock,
      lists: [{ ...listMock, theme: themeMock }],
    })
  )
}

export default mockUser
