import ListPage from 'pages/lists/[id]'
import { render, screen, waitFor } from '@testing-library/react'
import { themeMock, userMock } from 'mocks/mockData'
import { Movie, Theme, User } from 'interfaces/interface'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { server } from 'mocks/server'
import { AuthContext } from 'pages/_app'

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
      isReady: true,
      query: { id: 1 },
      push: mockedRouterPush,
      asPath: '/',
    }
  },
}))

const user = userEvent.setup()

describe('ListPage', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  describe('自分以外の投稿のとき', () => {
    beforeEach(
      async () =>
        await waitFor(() =>
          render(
            <AuthContext.Provider
              value={{
                loading: false,
                setLoading: jest.fn(),
                isSignedIn: true,
                setIsSignedIn: jest.fn(),
                currentUser: { ...userMock, id: userMock.id + 1 },
                setCurrentUser: jest.fn(),
                isGuest: false,
                setIsGuest: jest.fn(),
              }}
            >
              <ListPage />
            </AuthContext.Provider>
          )
        )
    )

    test('ユーザー名、タイトル、画像、コメントが表示されること', async () => {
      await waitFor(() => expect(screen.getByRole('link', { name: /USER/ })).toHaveAttribute('href', `/users/${userMock.id}`))
      expect(screen.getByRole('link', { name: /THEME/ })).toHaveAttribute('href', `/themes/${themeMock.id}`)
      expect(screen.getAllByText(/MOVIE/)).toHaveLength(6)
      expect(screen.getAllByRole('img', { name: /ポスター画像/ })).toHaveLength(5)
      expect(screen.getByText('COMMENT TEXT')).toBeTruthy
    })

    test('新規投稿ボタンがあること', async () => {
      await waitFor(() => user.click(screen.getByRole('button', { name: '' })))
      expect(mockedRouterPush).toBeCalledWith({ pathname: '/lists/new', query: { id: 1 } })
    })

    test('ツイートボタンがあること', async () => {
      await waitFor(() =>
        expect(screen.getByRole('link', { name: /tweet/ })).toHaveAttribute(
          'href',
          'https://twitter.com/intent/tweet?url=https://test.com/lists/1&text=1.%20MOVIE%0a1.%20MOVIE2%0a1.%20MOVIE3%0a1.%20MOVIE4%0a1.%20MOVIE5%0a&hashtags=THEME'
        )
      )
    })

    test('編集、削除ボタンがないこと', async () => {
      await waitFor(() => expect(screen.queryByRole('button', { name: /edit/ })).toBeNull)
      expect(screen.queryByRole('button', { name: /delete/ })).toBeNull
    })
  })

  describe('自分の投稿のとき', () => {
    beforeEach(
      async () =>
        await waitFor(() =>
          render(
            <AuthContext.Provider
              value={{
                loading: false,
                setLoading: jest.fn(),
                isSignedIn: true,
                setIsSignedIn: jest.fn(),
                currentUser: userMock,
                setCurrentUser: jest.fn(),
                isGuest: false,
                setIsGuest: jest.fn(),
              }}
            >
              <ListPage />
            </AuthContext.Provider>
          )
        )
    )
    test('ツイートボタンがあること', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: /tweet/ })).toBeInTheDocument)
    })

    test('編集、削除ボタンがあること', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: /edit/ })).toBeInTheDocument)
      expect(screen.getByRole('button', { name: /delete/ })).toBeInTheDocument
    })

    test('削除するとonDeleteが呼ばれること', async () => {
      await waitFor(() => user.click(screen.getByRole('button', { name: /delete/ })))
      expect(screen.getByText('削除する')).toBeInTheDocument
      await waitFor(() => user.click(screen.getByText('削除する')))
      expect(mockedRouterPush).toBeCalledTimes(1)
    })
  })
})
