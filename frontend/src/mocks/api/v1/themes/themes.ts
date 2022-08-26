import { listMock, themeMock, userMock } from 'mocks/mockData'
import { ResponseResolver, MockedRequest, restContext } from 'msw'

const mockedTheme = { ...themeMock, lists: [listMock], user: userMock }

const mockThemes: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  if (req.url.searchParams.get('id')) {
    return res(ctx.status(200), ctx.json(mockedTheme))
  } else {
    return res(ctx.status(200), ctx.json([mockedTheme]))
  }
}

export default mockThemes
