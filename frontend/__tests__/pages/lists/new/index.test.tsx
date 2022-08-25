import { render, screen, waitFor } from '@testing-library/react'
import NewList from 'pages/lists/new/index'
import { server } from 'mocks/server'
import { AuthContext } from 'pages/_app'
import { userMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(20000)

const routerPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: {},
      push: routerPush,
      back: jest.fn(),
      isReady: true,
      asPath: '/',
    }
  },
}))

describe('NewList', () => {
  const user = userEvent.setup()
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  describe('ログインしていないとき', () => {
    test('リダイレクトされること', async () => {
      render(
        <AuthContext.Provider
          value={{
            loading: false,
            setLoading: jest.fn(),
            isSignedIn: false,
            setIsSignedIn: jest.fn(),
            currentUser: undefined,
            setCurrentUser: jest.fn(),
            isGuest: false,
            setIsGuest: jest.fn(),
          }}
        >
          <NewList />
        </AuthContext.Provider>
      )

      expect(routerPush).toBeCalledWith('/signin')
    })
  })

  describe('query.idがあるとき', () => {
    beforeEach(() => {
      const useRouter = jest.spyOn(require('next/router'), 'useRouter')
      useRouter.mockImplementation(() => ({
        isReady: true,
        query: { id: 1 },
        push: routerPush,
      }))
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
          <NewList />
        </AuthContext.Provider>
      )
    })

    test('queryのthemeが選択済みであること', async () => {
      await waitFor(() => expect(screen.getByRole('heading', { name: 'THEME' })).toBeTruthy)
      expect(screen.getAllByText(/入力/)).toHaveLength(5)
    })

    test('入力して送信できること', async () => {
      await waitFor(() => expect(screen.getByText('作成')).toBeDisabled)
      await user.type(screen.getByLabelText('1'), 'MO')
      await waitFor(() => user.click(screen.getByText('MOVIE')))
      await user.type(screen.getByLabelText('2'), 'MOVIE2')
      await waitFor(() => user.click(screen.getByText('MOVIE2')))
      await user.type(screen.getByLabelText('3'), 'MOVIE3')
      await waitFor(() => user.click(screen.getByText('MOVIE3')))
      await user.type(screen.getByLabelText('4'), 'MOVIE4')
      await waitFor(() => user.click(screen.getByText('MOVIE4')))
      await user.type(screen.getByLabelText('5'), 'MOVIE5')
      await waitFor(() => user.click(screen.getByText('MOVIE5')))
      expect(screen.getByText('MOVIE5')).toBeInTheDocument
      expect(screen.getByText('作成')).toBeEnabled
      await waitFor(() => user.type(screen.getByLabelText('コメント'), 'COMMENT TEXT'))
      expect(screen.getByText('COMMENT TEXT')).toBeInTheDocument
      await waitFor(() => user.click(screen.getByText('作成')))
      await waitFor(() => expect(routerPush).toBeCalledWith('/lists/1'))
    })
  })

  describe('query.idがないとき', () => {
    beforeEach(() => {
      const useRouter = jest.spyOn(require('next/router'), 'useRouter')
      useRouter.mockImplementation(() => ({
        isReady: true,
        query: {},
      }))
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
          <NewList />
        </AuthContext.Provider>
      )
    })

    test('お題を選択できること', async () => {
      await waitFor(() => expect(screen.queryAllByText(/入力/)).toBeNull)
      await waitFor(() => user.click(screen.getByText('お題を選択')))
      await waitFor(() => user.click(screen.getByText('THEME')))
      await waitFor(() => expect(screen.getByRole('heading', { name: 'THEME' })).toBeTruthy)
      expect(screen.getAllByText(/入力/)).toHaveLength(5)
    })
  })
})
