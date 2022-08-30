import { listMock, themeMock, userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const mockedList = { ...listMock, theme: themeMock, user: userMock }

const mockLists: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  if (req.url.searchParams.get('id')) {
    return res(ctx.status(200), ctx.json(mockedList))
  } else {
    return res(ctx.status(200), ctx.json([mockedList]))
  }
}

export default mockLists
