import UserPage from 'pages/users/[id]'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { render, screen } from '@testing-library/react'
import { listMock, themeMock, userMock } from 'mocks/mockData'
import { AuthContext } from 'pages/_app'
import { Movie, Theme, User } from 'interfaces/interface'

const mockedUser = {
  ...userMock,
  lists: [{ ...listMock, theme: themeMock, isDeleted: false }],
}

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

describe('UserPage', () => {
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
          <UserPage user={mockedUser} />
        </AuthContext.Provider>
      )
      mockAllIsIntersecting(true)
    })

    test('ユーザー名、関連レコードが表示されること', async () => {
      expect(
        screen.getByRole('heading', {
          name: /USER/,
        })
      ).toBeTruthy
      expect(screen.getByText(/MOVIE/)).toBeTruthy
      expect(screen.getByText(/THEME/)).toBeTruthy
    })

    test('list編集、削除ボタンがあること', async () => {
      expect(screen.getByRole('button', { name: /ベストを編集/ })).toBeTruthy
      expect(screen.getByRole('button', { name: /ベストを削除/ })).toBeTruthy
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
          <UserPage user={mockedUser} />
        </AuthContext.Provider>
      )
      mockAllIsIntersecting(true)
    })

    test('list編集、削除ボタンがないこと', async () => {
      expect(screen.queryByRole('button', { name: /ベストを編集/ })).toBeNull
      expect(screen.queryByRole('button', { name: /ベストを削除/ })).toBeNull
    })
  })
})
