import ThemePage from 'pages/themes/[id]'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { render, screen, waitFor } from '@testing-library/react'
import { Movie, Theme, User } from 'interfaces/interface'
import { server } from 'mocks/server'

jest.mock('components/lists/listCard', () => {
  const MockListCard = ({ theme: theme, user: user, movies: movies }: { theme: Theme; user: User; movies: Array<Movie> }) => (
    <div data-testid='list-card'>
      {theme.title},{movies.map((m) => m.title)},{user.name}
    </div>
  )
  return MockListCard
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      isReady: true,
      query: { id: 1 },
      asPath: '/',
    }
  },
}))

describe('ThemePage', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })
  beforeEach(() => {
    render(<ThemePage />)
    mockAllIsIntersecting(true)
  })

  test('ページタイトルがあること', async () => {
    await waitFor(() => expect(screen.getByRole('heading', { name: /THEME/ })).toBeTruthy)
  })
})
