import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Setting from 'pages/setting'
import { AuthContext } from 'pages/_app'
import { server } from 'mocks/server'
import { userMock } from 'mocks/mockData'
import '@testing-library/jest-dom/extend-expect'

const mockedSetIsSignedIn = jest.fn()
const mockedSetCurrentUser = jest.fn()

const mockedRedirect = jest.fn()
const mockedAlreadySignIn = jest.fn()
const mockedGuestUserUnavailable = jest.fn()
jest.mock('lib/helpers', () => ({
  ...jest.requireActual('lib/helpers'),
  redirectToSignIn: () => mockedRedirect(),
  alreadySignIn: () => mockedAlreadySignIn(),
  guestUserUnavailable: () => mockedGuestUserUnavailable(),
}))

const mockedRouterPush = jest.fn()
const mockedRouterBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockedRouterPush,
      back: mockedRouterBack,
      asPath: '/'
    }
  },
}))

const mockedToastError = jest.fn()
jest.mock('lib/toast', () => ({
  ...jest.requireActual('lib/toast'),
  toastError: () => mockedToastError(),
}))

describe('Setting', () => {
  const user = userEvent.setup()
  describe('ログインしていないとき', () => {
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
          <Setting />
        </AuthContext.Provider>
      )
    })

    test('リダイレクトすること', async () => {
      expect(mockedRedirect).toBeCalledTimes(1)
    })
  })

  describe('ゲストユーザーのとき', () => {
    beforeEach(() => {
      render(
        <AuthContext.Provider
          value={{
            loading: false,
            setLoading: jest.fn(),
            isSignedIn: true,
            setIsSignedIn: mockedSetIsSignedIn,
            currentUser: userMock,
            setCurrentUser: mockedSetCurrentUser,
            isGuest: true,
            setIsGuest: jest.fn(),
          }}
        >
          <Setting />
        </AuthContext.Provider>
      )
    })

    test('リダイレクトすること', async () => {
      expect(mockedGuestUserUnavailable).toBeCalledTimes(1)
    })
  })

  describe('一般ユーザーのとき', () => {
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
            isSignedIn: true,
            setIsSignedIn: jest.fn(),
            currentUser: userMock,
            setCurrentUser: mockedSetCurrentUser,
            isGuest: false,
            setIsGuest: jest.fn(),
          }}
        >
          <Setting />
        </AuthContext.Provider>
      )
    })
    test('ページタイトルと戻るボタンがあること', async () => {
      expect(screen.getByText('アカウント情報変更')).toBeInTheDocument
      expect(screen.getByRole('button', { name: 'ユーザー情報へ戻る' })).toBeInTheDocument
    })
    test('デフォルトでユーザー名、emailが入力されていること', async () => {
      expect((screen.getByLabelText(/ユーザー名/) as HTMLInputElement).value).toBe(userMock.name)
      expect((screen.getByLabelText(/Email/) as HTMLInputElement).value).toBe(userMock.email)
      expect((screen.getByLabelText(/パスワード/) as HTMLInputElement).value).toBeNull
    })

    test('入力して送信できること', async () => {
      const inputName = screen.getByLabelText(/ユーザー名/) as HTMLInputElement
      const inputEmail = screen.getByLabelText(/Email/) as HTMLInputElement
      const inputPassword = screen.getByLabelText(/パスワード/) as HTMLInputElement
      const button = screen.getByRole('button', { name: 'アカウント更新' })
      await waitFor(() => user.type(inputName, 'update'))
      await waitFor(() => user.clear(inputEmail))
      await waitFor(() => user.type(inputEmail, 'update@example.com'))
      await waitFor(() => user.type(inputPassword, 'password'))
      expect(inputName.value).toBe('USERupdate')
      expect(inputEmail.value).toBe('update@example.com')
      expect(inputPassword.value).toBe('password')
      await waitFor(() => user.click(button))
      await waitFor(() => expect(screen.getByText(/認証メールを送信しました/)).toBeInTheDocument)
    })

    test('空欄があると送信できないこと', async () => {
      const inputName = screen.getByLabelText(/ユーザー名/) as HTMLInputElement
      const inputEmail = screen.getByLabelText(/Email/) as HTMLInputElement
      const inputPassword = screen.getByLabelText(/パスワード/) as HTMLInputElement
      const button = screen.getByRole('button', { name: 'アカウント更新' })
      expect(button).toBeDisabled
      await waitFor(() => user.type(inputPassword, 'password'))
      expect(button).toBeEnabled()
      await waitFor(() => user.clear(inputEmail))
      expect(button).toBeDisabled
      await waitFor(() => user.type(inputEmail, 'update@example.com'))
      await waitFor(() => user.clear(inputName))
      expect(button).toBeDisabled
    })

    test('バリデーションエラーがあると表示されること', async () => {
      const inputEmail = screen.getByLabelText(/Email/) as HTMLInputElement
      const inputPassword = screen.getByLabelText(/パスワード/) as HTMLInputElement
      const button = screen.getByRole('button', { name: 'アカウント更新' })
      await waitFor(() => user.clear(inputEmail))
      await waitFor(() => user.type(inputEmail, 'invalidEmail'))
      await waitFor(() => user.type(inputPassword, 'password'))
      await waitFor(() => user.click(button))
      expect(screen.getByText(/の形式が正しくありません/)).toBeInTheDocument
      expect(mockedSetCurrentUser).toBeCalledTimes(0)
    })

    test('パスワードが間違っていると更新されないこと', async () => {
      const inputPassword = screen.getByLabelText(/パスワード/) as HTMLInputElement
      const button = screen.getByRole('button', { name: 'アカウント更新' })
      await waitFor(() => user.type(inputPassword, 'mistake'))
      await waitFor(() => user.click(button))
      expect(mockedToastError).toBeCalledTimes(1)
      expect(mockedSetCurrentUser).toBeCalledTimes(0)
    })
  })
})
