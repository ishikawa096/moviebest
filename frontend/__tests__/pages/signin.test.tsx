import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from 'pages/signin'
import { AuthContext } from 'pages/_app'
import { server } from 'mocks/server'
import { userMock } from 'mocks/mockData'
import '@testing-library/jest-dom/extend-expect'

const mockedSetIsSignedIn = jest.fn()
const mockedSetCurrentUser = jest.fn()
const mockedSetIsGuest = jest.fn()

const mockedRedirect = jest.fn()
const mockedAlreadySignIn = jest.fn()
jest.mock('lib/helpers', () => ({
  ...jest.requireActual('lib/helpers'),
  redirectToSignIn: () => mockedRedirect(),
  alreadySignIn: () => mockedAlreadySignIn(),
}))

const mockedRouterBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      back: mockedRouterBack,
      asPath: '/'
    }
  },
}))

describe('SignIn', () => {
  const user = userEvent.setup()
  describe('ログインしていないとき', () => {
    beforeAll(() => {
      server.listen()
    })
    afterAll(() => {
      server.close()
    })

    beforeEach(() => {
      render(
        <AuthContext.Provider
          value={{
            loading: false,
            setLoading: jest.fn(),
            isSignedIn: false,
            setIsSignedIn: mockedSetIsSignedIn,
            currentUser: undefined,
            setCurrentUser: mockedSetCurrentUser,
            isGuest: false,
            setIsGuest: mockedSetIsGuest,
          }}
        >
          <SignIn />
        </AuthContext.Provider>
      )
    })

    test('フォームに入力してログインできること', async () => {
      const inputEmail = screen.getByLabelText(/Email/) as HTMLInputElement
      const inputPassword = screen.getByLabelText(/パスワード/) as HTMLInputElement
      const button = screen.getByRole('button', { name: 'ログイン' })
      expect(button).toBeDisabled()
      await waitFor(() => user.type(inputEmail, 'test@example.com'))
      await waitFor(() => user.type(inputPassword, 'password'))
      expect(inputEmail.value).toBe('test@example.com')
      expect(inputPassword.value).toBe('password')
      expect(button).toBeEnabled()
      await waitFor(() => user.click(button))
      expect(mockedSetIsSignedIn).toBeCalledWith(true)
      expect(mockedSetCurrentUser).toBeCalledTimes(1)
      expect(mockedRouterBack).toBeCalledTimes(1)
    })

    test('パスワードが間違っているとログインできないこと', async () => {
      const inputEmail = screen.getByLabelText(/Email/) as HTMLInputElement
      const inputPassword = screen.getByLabelText(/パスワード/) as HTMLInputElement
      const button = screen.getByRole('button', { name: 'ログイン' })
      await waitFor(() => user.type(inputEmail, 'test@example.com'))
      await waitFor(() => user.type(inputPassword, 'mistake'))
      await waitFor(() => user.click(button))
      await waitFor(() =>expect(screen.getByText(/Emailかパスワードが違います/)).toBeInTheDocument)
      expect(mockedSetIsSignedIn).toBeCalledTimes(0)
    })

    test('ゲストログインできること', async () => {
      const button = screen.getByRole('button', { name: 'ゲストログイン' })
      expect(button).toBeEnabled()
      await waitFor(() => user.click(button))
      expect(mockedSetIsSignedIn).toBeCalledWith(true)
      expect(mockedSetCurrentUser).toBeCalledTimes(1)
      expect(mockedRouterBack).toBeCalledTimes(1)
      expect(mockedSetIsGuest).toBeCalledWith(true)
    })
  })

  describe('ログインしているとき', () => {
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
          <SignIn />
        </AuthContext.Provider>
      )
    })

    test('リダイレクトすること', async () => {
      expect(mockedAlreadySignIn).toBeCalledTimes(1)
    })
  })
})
