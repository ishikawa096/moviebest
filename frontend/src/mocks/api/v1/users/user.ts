import { listMock, themeMock, userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const mockedUser = { ...userMock, lists: [{ ...listMock, theme: themeMock, isDeleted: false }]  }

const mockUser: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  if (req.url.searchParams.get('id')) {
    return res(ctx.status(200), ctx.json(mockedUser))
  }
}

export default mockUser
