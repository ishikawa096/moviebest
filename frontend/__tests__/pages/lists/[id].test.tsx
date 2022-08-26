import ListPage from 'pages/lists/[id]'
import { render, screen } from '@testing-library/react'
import { listMock, themeMock, userMock } from 'mocks/mockData'
import { Movie, Theme, User } from 'interfaces/interface'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

jest.mock('components/lists/listCard', () => {
  const MockListCard = ({ theme: theme, user: user, movies: movies }: { theme: Theme; user: User; movies: Array<Movie> }) => (
    <div data-testid='list-card'>
      {theme.title},{movies.map((m) => m.title)},{user.name}
    </div>
  )
  return MockListCard
})

const mockedRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockedRouterPush,
      asPath: '/',
    }
  },
}))

describe('ListPage', () => {
  const user = userEvent.setup()
  beforeEach(() => {
    render(<ListPage list={{ ...listMock, theme: themeMock, user: userMock }} />)
  })

  test('ユーザー名、タイトル、画像、コメントが表示されること', async () => {
    expect(screen.getByRole('link', { name: /USER/ })).toHaveAttribute('href', `/users/${userMock.id}`)
    expect(screen.getByRole('link', { name: /THEME/ })).toHaveAttribute('href', `/themes/${themeMock.id}`)
    expect(screen.getAllByText(/MOVIE/)).toHaveLength(6)
    expect(screen.getAllByRole('img', { name: /ポスター画像/ })).toHaveLength(5)
    expect(screen.getByText('COMMENT TEXT')).toBeTruthy
  })

  test('新規投稿ボタンがあること', async () => {
    await user.click(screen.getByRole('button', { name: '' }))
    expect(mockedRouterPush).toBeCalledWith({ pathname: '/lists/new', query: { id: 1 } })
  })

  test('ツイートボタンがあること', async () => {
    expect(screen.getByRole('link', { name: /tweet/ })).toHaveAttribute('href', 'https://twitter.com/intent/tweet?url=https://test.com/lists/1&text=1.%20MOVIE%0a1.%20MOVIE2%0a1.%20MOVIE3%0a1.%20MOVIE4%0a1.%20MOVIE5%0a&hashtags=THEME')
  })
})
