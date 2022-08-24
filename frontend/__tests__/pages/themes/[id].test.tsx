import ThemePage from 'pages/themes/[id]'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { render, screen } from '@testing-library/react'
import { listMock, themeMock, userMock } from 'mocks/mockData'
import { Movie, Theme, User } from 'interfaces/interface'

const mockedTheme = { ...themeMock, lists: [{ ...listMock, user: userMock }] }

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
      asPath: '/',
    }
  },
}))

describe('ThemePage', () => {
  beforeEach(() => {
    render(<ThemePage theme={mockedTheme} />)
    mockAllIsIntersecting(true)
  })

  test('ページタイトルがあること', async () => {
    expect(screen.getByRole('heading', { name: /THEME/ })).toBeTruthy
  })

  test('関連データが表示されること', async () => {
    expect(screen.getAllByText(/MOVIE/)).toBeTruthy
    expect(screen.getByText(/USER/)).toBeTruthy
  })
})
