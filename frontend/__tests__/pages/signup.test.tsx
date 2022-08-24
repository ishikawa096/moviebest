import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthContext } from 'pages/_app'
import SignUp from 'pages/signup'
import { userMock } from 'mocks/mockData'
import { server } from 'mocks/server'
import '@testing-library/jest-dom/extend-expect'

const mockedSetIsSignedIn = jest.fn()
const mockedSetCurrentUser = jest.fn()

const mockedRedirect = jest.fn()
const mockedAlreadySignIn = jest.fn()
jest.mock('lib/helpers', () => ({
  ...jest.requireActual('lib/helpers'),
  redirectToSignIn: () => mockedRedirect(),
  alreadySignIn: () => mockedAlreadySignIn(),
}))

const mockedRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockedRouterPush,
      asPath: '/'
    }
  },
}))

describe('SignUp', () => {
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
            setIsGuest: jest.fn(),
          }}
        >
          <SignUp />
        </AuthContext.Provider>
      )
    })

    test('フォームに入力してサインアップできる', async () => {
      const inputName = screen.getByLabelText('ユーザー名') as HTMLInputElement
      const inputEmail = screen.getByLabelText('Email') as HTMLInputElement
      const inputPassword = screen.getByLabelText('パスワード') as HTMLInputElement
      const inputConfirm = screen.getByLabelText('確認用パスワード') as HTMLInputElement
      const button = screen.getByRole('button', { name: '新規登録' })
      expect(button).toBeDisabled()
      await waitFor(() => user.type(inputName, 'USER'))
      await waitFor(() => user.type(inputEmail, 'test@example.com'))
      await waitFor(() => user.type(inputPassword, 'password'))
      await waitFor(() => user.type(inputConfirm, 'password'))
      expect(inputName.value).toBe('USER')
      expect(inputEmail.value).toBe('test@example.com')
      expect(inputPassword.value).toBe('password')
      expect(inputConfirm.value).toBe('password')
      expect(button).toBeEnabled()
      await waitFor(() => user.click(button))
      expect(mockedSetIsSignedIn).toBeCalledWith(true)
      expect(mockedSetCurrentUser).toBeCalledTimes(1)
      expect(mockedRouterPush).toBeCalledWith('/')
    })

    test('入力エラーがあると表示される', async () => {
      const inputName = screen.getByLabelText('ユーザー名') as HTMLInputElement
      const inputEmail = screen.getByLabelText('Email') as HTMLInputElement
      const inputPassword = screen.getByLabelText('パスワード') as HTMLInputElement
      const inputConfirm = screen.getByLabelText('確認用パスワード') as HTMLInputElement
      const button = screen.getByRole('button', { name: '新規登録' })
      await waitFor(() => user.type(inputName, 'USER'))
      await waitFor(() => user.type(inputEmail, 'invalidEmail'))
      await waitFor(() => user.type(inputPassword, 'pass'))
      await waitFor(() => user.type(inputConfirm, 'p'))
      await waitFor(() => user.click(button))
      expect(screen.getByText(/の形式が正しくありません/)).toBeInTheDocument
      expect(screen.getByText(/文字以上/)).toBeInTheDocument
      expect(screen.getByText(/一致しません/)).toBeInTheDocument
      expect(mockedSetIsSignedIn).toBeCalledTimes(0)
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
          <SignUp />
        </AuthContext.Provider>
      )
    })

    test('リダイレクトすること', async () => {
      expect(mockedAlreadySignIn).toBeCalledTimes(1)
    })
  })
})
