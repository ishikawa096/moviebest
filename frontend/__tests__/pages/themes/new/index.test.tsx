import { render, screen, waitFor } from '@testing-library/react'
import NewTheme from 'pages/themes/new/index'
import { server } from 'mocks/server'
import { AuthContext } from 'pages/_app'
import { userMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'

const routerPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: routerPush,
      asPath: '/',
    }
  },
}))

const mockToast = jest.fn()
jest.mock('lib/toast', () => ({
  toastSuccess: () => mockToast(),
  toastWarn: () => jest.fn(),
}))

describe('NewTheme', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  describe('ログインしていないとき', () => {
    test('ログインページにリダイレクトされること', async () => {
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
          <NewTheme />
        </AuthContext.Provider>
      )
      expect(routerPush).toBeCalledTimes(1)
    })
  })

  describe('ログインしているとき', () => {
    beforeEach(() =>
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
          <NewTheme />
        </AuthContext.Provider>
      )
    )
    test('ページタイトルがあること', async () => {
      expect(screen.getByRole('heading', { name: '新しいお題をつくる' })).toBeTruthy
    })

    test('入力して送信しページ移動すること', async () => {
      const user = userEvent.setup()
      await waitFor(() => user.type(screen.getByRole('textbox'), 'THEME'))
      await waitFor(() => user.selectOptions(screen.getByRole('combobox'), screen.getByRole('option', { name: '3' })))
      await waitFor(() => user.click(screen.getByRole('button')))
      expect(mockToast).toBeCalledTimes(1)
      expect(routerPush).toBeCalledWith({ pathname: '/lists/new', query: { id: 1 } })
    })
  })
})
