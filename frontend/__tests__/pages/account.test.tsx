import Account from 'pages/account'
import { render, screen, waitFor } from '@testing-library/react'
import { userMock } from 'mocks/mockData'
import { AuthContext } from 'pages/_app'
import userEvent from '@testing-library/user-event'
import { server } from 'mocks/server'
import '@testing-library/jest-dom/extend-expect'

const mockedSetIsSignedIn = jest.fn()
const mockedRedirect = jest.fn()
jest.mock('lib/helpers', () => ({
  redirectToSignIn: () => mockedRedirect(),
}))

const mockedRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockedRouterPush,
      asPath: '/',
    }
  },
}))

describe('Account', () => {
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
            setIsSignedIn: mockedSetIsSignedIn,
            currentUser: userMock,
            setCurrentUser: jest.fn(),
            isGuest: false,
            setIsGuest: jest.fn(),
          }}
        >
          <Account />
        </AuthContext.Provider>
      )
    })

    test('ページタイトル、ユーザー名、emailが表示されること', async () => {
      expect(screen.getByRole('heading', { name: 'ユーザー設定' })).toBeTruthy
      expect(screen.getByText(userMock.email)).toBeTruthy
      expect(screen.getByText(userMock.name)).toBeTruthy
    })

    test('編集、削除ボタンがあること', async () => {
      expect(screen.getByRole('button', { name: /名前・Eメール変更/ })).toBeEnabled
      expect(screen.getByRole('button', { name: /パスワード変更/ })).toBeEnabled
      expect(screen.getByRole('button', { name: /アカウント削除/ })).toBeEnabled
    })

    test('ボタンから編集ページへ移動できること', async () => {
      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: /名前・Eメール変更/ }))
      expect(mockedRouterPush).toBeCalledWith('/setting')
      await user.click(screen.getByRole('button', { name: /パスワード変更/ }))
      expect(mockedRouterPush).toBeCalledWith('/password')
    })

    test('アカウント削除できること', async () => {
      const user = userEvent.setup()
      await waitFor(() => user.click(screen.getByRole('button', { name: /アカウント削除/ })))
      expect(screen.getByText('アカウントを削除しますか？')).toBeInTheDocument
      expect(screen.getByText('削除する')).toBeEnabled
      expect(screen.getByText('削除しない')).toBeEnabled
      await waitFor(() => user.click(screen.getByText('削除する')))
      expect(mockedSetIsSignedIn).toHaveBeenCalledWith(false)
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
            setIsSignedIn: jest.fn(),
            currentUser: userMock,
            setCurrentUser: jest.fn(),
            isGuest: true,
            setIsGuest: jest.fn(),
          }}
        >
          <Account />
        </AuthContext.Provider>
      )
    })

    test('ページタイトル、ユーザー名、emailが表示されること', async () => {
      expect(screen.getByRole('heading', { name: 'ユーザー設定' })).toBeTruthy
      expect(screen.getByText(userMock.email)).toBeTruthy
      expect(screen.getByText(userMock.name)).toBeTruthy
    })

    test('編集、削除ボタンが押せないこと', async () => {
      expect(screen.getByText(/ゲストユーザーはユーザー情報を変更できません/)).toBeInTheDocument
      expect(screen.getByRole('button', { name: /名前・Eメール変更/ })).toBeDisabled
      expect(screen.getByRole('button', { name: /パスワード変更/ })).toBeDisabled
      expect(screen.getByRole('button', { name: /アカウント削除/ })).toBeDisabled
    })
  })

  describe('ログインしていないとき', () => {
    beforeEach(() => {
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
          <Account />
        </AuthContext.Provider>
      )
    })

    test('ログインページへリダイレクトすること', async () => {
      expect(mockedRedirect).toBeCalledTimes(1)
    })
  })
})
