import { ResponseResolver, MockedRequest, restContext } from 'msw'

const MockTmdbSearch: ResponseResolver<MockedRequest, typeof restContext> =  (req, res, ctx) => {
    return res(
      ctx.json({
        results: [{
          title: 'ミニオンズ',
          posterPath: '/path.jpg',
          id: 1,
          }]
      })
    )
  }

export default MockTmdbSearch
