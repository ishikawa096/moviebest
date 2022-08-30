import UserPage from 'pages/users/[id]'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { render, screen, waitFor } from '@testing-library/react'
import { userMock } from 'mocks/mockData'
import { AuthContext } from 'pages/_app'
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

  describe('自分のユーザーページのとき', () => {
    beforeEach(() => {
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
          <UserPage />
        </AuthContext.Provider>
      )
      mockAllIsIntersecting(true)
    })

    test('スクロールボタンがあること', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: /上へスクロール/ })).toBeInTheDocument)
    })
  })

  describe('自分以外のユーザーページのとき', () => {
    beforeEach(() => {
      userMock.id = 2
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
          <UserPage />
        </AuthContext.Provider>
      )
      mockAllIsIntersecting(true)
    })

    test('list編集、削除ボタンがないこと', async () => {
      await waitFor(() => expect(screen.queryByRole('button', { name: /ベストを編集/ })).toBeNull)
      await waitFor(() => expect(screen.queryByRole('button', { name: /ベストを削除/ })).toBeNull)
    })

    test('スクロールボタンがあること', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: /上へスクロール/ })).toBeInTheDocument)
    })
  })
})
