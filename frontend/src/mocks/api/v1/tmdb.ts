import { ResponseResolver, MockedRequest, restContext } from 'msw'

const movie = {
          title: 'MOVIE',
          posterPath: '/path.jpg',
          id: 1,
          }
const MockTmdbSearch: ResponseResolver<MockedRequest, typeof restContext> =  (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          movie,
          { ...movie, id: 2, title: 'MOVIE2' },
          { ...movie, id: 3, title: 'MOVIE3' },
          { ...movie, id: 4, title: 'MOVIE4' },
          { ...movie, id: 5, title: 'MOVIE5' },
        ]
      })
    )
  }

export default MockTmdbSearch
