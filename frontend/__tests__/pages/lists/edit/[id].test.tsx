import { render, screen, waitFor } from '@testing-library/react'
import EditList from 'pages/lists/edit/[id]'
import { server } from 'mocks/server'
import { AuthContext } from 'pages/_app'
import { userMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

const routerPush = jest.fn()
const routerBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: 1 },
      push: routerPush,
      back: routerBack,
      isReady: true,
      asPath: '/',
    }
  },
}))

describe('EditList', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  describe('自分のlistのとき', () => {
    const user = userEvent.setup()
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
          <EditList />
        </AuthContext.Provider>
      )
    })

    test('themeタイトル, movieタイトル等が表示されること', async () => {
      await waitFor(() => expect(screen.getByRole('heading', { name: 'THEME' })).toBeTruthy)
      expect(screen.getAllByText(/MOVIE/)).toHaveLength(5)
      expect(screen.getByText('COMMENT TEXT')).toBeTruthy
      expect(screen.getByRole('button', { name: '確定' })).toBeEnabled
    })

    test('編集して送信できること', async () => {
      await waitFor(() => user.type(screen.getByLabelText('1'), 'MO'))
      await waitFor(() => user.click(screen.getByText('MOVIE')))
      await waitFor(() => user.type(screen.getByLabelText('コメント'), 'update'))
      expect(screen.getByText('COMMENT TEXTupdate')).toBeInTheDocument
      await waitFor(() => user.click(screen.getByRole('button', { name: '確定' })))
      await waitFor(() => expect(routerPush).toBeCalledWith('/lists/1'))
    })
  })

  describe('別のユーザーのlistのとき', () => {
    test('リダイレクトされること', async () => {
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
          <EditList />
        </AuthContext.Provider>
      )
      await waitFor(() => expect(routerBack).toBeCalledTimes(1))
    })
  })
})
