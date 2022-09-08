import UserPage from 'pages/users/[id]'
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

describe('UserPage', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  beforeEach(async() => {
    await waitFor(() => render(<UserPage />))
    mockAllIsIntersecting(true)
  })

  test('ユーザー名が表示されること', async () => {
    await waitFor(() => expect(screen.getByRole('heading', { name: /USER/ })).toBeTruthy)
  })

  test('スクロールボタンがあること', async () => {
    await waitFor(() => expect(screen.getByRole('button', { name: /上へスクロール/ })).toBeInTheDocument)
  })
})
