import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Password from 'pages/password'
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

describe('Password', () => {
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
          <Password />
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
          <Password />
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
          <Password />
        </AuthContext.Provider>
      )
    })
    test('ページタイトルと戻るボタンがあること', async () => {
      expect(screen.getByText('パスワード変更')).toBeInTheDocument
      expect(screen.getByRole('button', { name: 'ユーザー情報へ戻る' })).toBeInTheDocument
    })
    test('デフォルトで空欄であること', async () => {
      expect((screen.getByLabelText('現在のパスワード') as HTMLInputElement).value).toBeNull
      expect((screen.getByLabelText('新しいパスワード') as HTMLInputElement).value).toBeNull
      expect((screen.getByLabelText('確認用パスワード') as HTMLInputElement).value).toBeNull
    })

    test('入力して送信できること', async () => {
      const inputCurrent = screen.getByLabelText('現在のパスワード') as HTMLInputElement
      const inputNew = screen.getByLabelText('新しいパスワード') as HTMLInputElement
      const inputConfirm = screen.getByLabelText('確認用パスワード') as HTMLInputElement
      const button = screen.getByRole('button', { name: 'パスワード更新' })
      await waitFor(() => user.type(inputCurrent, 'password'))
      await waitFor(() => user.type(inputNew, 'newPassword'))
      await waitFor(() => user.type(inputConfirm, 'newPassword'))
      expect(inputCurrent.value).toBe('password')
      expect(inputNew.value).toBe('newPassword')
      expect(inputConfirm.value).toBe('newPassword')
      await waitFor(() => user.click(button))
      expect(mockedRouterPush).toHaveBeenCalledWith('/account')
    })

    test('空欄があると送信できないこと', async () => {
      const inputCurrent = screen.getByLabelText('現在のパスワード') as HTMLInputElement
      const inputNew = screen.getByLabelText('新しいパスワード') as HTMLInputElement
      const inputConfirm = screen.getByLabelText('確認用パスワード') as HTMLInputElement
      const button = screen.getByRole('button', { name: 'パスワード更新' })
      expect(button).toBeDisabled
      await waitFor(() => user.type(inputCurrent, 'password'))
      await waitFor(() => user.type(inputNew, 'password'))
      expect(button).toBeDisabled
      await waitFor(() => user.type(inputConfirm, 'password'))
      expect(button).toBeEnabled()
      await waitFor(() => user.clear(inputCurrent))
      expect(button).toBeDisabled
      await waitFor(() => user.type(inputCurrent, 'password'))
      await waitFor(() => user.clear(inputNew))
      expect(button).toBeDisabled
    })

    test('バリデーションエラーがあると表示されること', async () => {
      const inputCurrent = screen.getByLabelText('現在のパスワード') as HTMLInputElement
      const inputNew = screen.getByLabelText('新しいパスワード') as HTMLInputElement
      const inputConfirm = screen.getByLabelText('確認用パスワード') as HTMLInputElement
      const button = screen.getByRole('button', { name: 'パスワード更新' })
      await waitFor(() => user.type(inputCurrent, 'password'))
      await waitFor(() => user.type(inputNew, 'pass'))
      await waitFor(() => user.type(inputConfirm, 'password'))
      await waitFor(() => user.click(button))
      expect(screen.getByText(/文字以上必要です/)).toBeInTheDocument
      expect(screen.getByText(/一致しません/)).toBeInTheDocument
      expect(mockedRouterPush).toBeCalledTimes(0)
    })

    test('パスワードが間違っていると更新されないこと', async () => {
      const inputCurrent = screen.getByLabelText('現在のパスワード') as HTMLInputElement
      const inputNew = screen.getByLabelText('新しいパスワード') as HTMLInputElement
      const inputConfirm = screen.getByLabelText('確認用パスワード') as HTMLInputElement
      const button = screen.getByRole('button', { name: 'パスワード更新' })
      await waitFor(() => user.type(inputCurrent, 'mistake'))
      await waitFor(() => user.type(inputNew, 'newPassword'))
      await waitFor(() => user.type(inputConfirm, 'newPassword'))
      await waitFor(() => user.click(button))
      expect(mockedToastError).toBeCalledTimes(1)
      expect(mockedRouterPush).toBeCalledTimes(0)
    })
  })
})
