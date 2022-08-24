import { act, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './header'
import { userMock } from 'mocks/mockData'
import { AuthContext } from 'pages/_app'
import userEvent from '@testing-library/user-event'
import { server } from 'mocks/server'

const setIsSignedIn = jest.fn()
const setIsGuest = jest.fn()

const mockedRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockedRouterPush,
    }
  },
}))

describe('Header', () => {
  const user = userEvent.setup()
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
          <Header />
        </AuthContext.Provider>
      )
    })

    test('メニューが表示されていること', async () => {
      expect(screen.getByText(/使い方/)).toBeTruthy()
      expect(screen.getByText(/お題一覧/)).toBeTruthy()
      expect(screen.getByText(/新着ベスト/)).toBeTruthy()
      expect(screen.getByRole('button', { name: 'ログイン' })).toBeEnabled()
      expect(screen.getByRole('button', { name: '新規登録' })).toBeEnabled()
    })

    test('クリックで移動できること', async () => {
      await waitFor(() => user.click(screen.getByText(/使い方/)))
      expect(mockedRouterPush).lastCalledWith('/#about')
      await waitFor(() => user.click(screen.getByText(/お題一覧/)))
      expect(mockedRouterPush).lastCalledWith('/themes')
      await waitFor(() => user.click(screen.getByText(/新着ベスト/)))
      expect(mockedRouterPush).lastCalledWith('/lists')
      await waitFor(() => user.click(screen.getByRole('button', { name: 'ログイン' })))
      expect(mockedRouterPush).lastCalledWith('/signin')
      await waitFor(() => user.click(screen.getByRole('button', { name: '新規登録' })))
      expect(mockedRouterPush).lastCalledWith('/signup')
    })

    test('画面幅が小さいときハンバーガーメニューになること', async () => {
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          value: 400,
        })
        window.dispatchEvent(new Event('resize'))
      })
      const menuButton = screen.getByText('メニューを開く')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/使い方/)))
      await waitFor(() => user.click(menuButton))
      expect(mockedRouterPush).lastCalledWith('/#about')
      await waitFor(() => user.click(screen.getByText(/お題一覧/)))
      await waitFor(() => user.click(menuButton))
      expect(mockedRouterPush).lastCalledWith('/themes')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/新着ベスト/)))
      expect(mockedRouterPush).lastCalledWith('/lists')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByRole('button', { name: 'ログイン' })))
      expect(mockedRouterPush).lastCalledWith('/signin')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByRole('button', { name: '新規登録' })))
      expect(mockedRouterPush).lastCalledWith('/signup')
    })
  })

  describe('ログインしているとき', () => {
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
            setIsSignedIn: setIsSignedIn,
            currentUser: userMock,
            setCurrentUser: jest.fn(),
            isGuest: false,
            setIsGuest: setIsGuest,
          }}
        >
          <Header />
        </AuthContext.Provider>
      )
    })

    test('メニューが表示されていること', async () => {
      expect(screen.getByText(/使い方/)).toBeTruthy()
      expect(screen.getByText(/お題一覧/)).toBeTruthy()
      expect(screen.getByText(/新着ベスト/)).toBeTruthy()
      expect(screen.getByText('設定')).toBeTruthy()
      expect(screen.getByRole('button', { name: 'お題投稿' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'ベスト投稿' })).toBeEnabled()
    })

    test('クリックで移動できること', async () => {
      await waitFor(() => user.click(screen.getByText(/使い方/)))
      expect(mockedRouterPush).lastCalledWith('/#about')
      await waitFor(() => user.click(screen.getByText(/お題一覧/)))
      expect(mockedRouterPush).lastCalledWith('/themes')
      await waitFor(() => user.click(screen.getByText(/新着ベスト/)))
      expect(mockedRouterPush).lastCalledWith('/lists')
      await waitFor(() => user.click(screen.getByRole('button', { name: 'お題投稿' })))
      expect(mockedRouterPush).lastCalledWith('/themes/new')
      await waitFor(() => user.click(screen.getByRole('button', { name: 'ベスト投稿' })))
      expect(mockedRouterPush).lastCalledWith('/lists/new')
    })

    test('設定をクリックしてマイベストに移動できること', async () => {
      await waitFor(() => user.click(screen.getByText('設定')))
      await waitFor(() => user.click(screen.getByText(/マイベスト/)))
      expect(mockedRouterPush).lastCalledWith(`/users/${userMock.id}`)
    })

    test('設定をクリックしてユーザー設定に移動できること', async () => {
      await waitFor(() => user.click(screen.getByText('設定')))
      await waitFor(() => user.click(screen.getByText(/ユーザー設定/)))
      expect(mockedRouterPush).lastCalledWith('/account')
    })

    test('ログアウトできること', async () => {
      await waitFor(() => user.click(screen.getByText('設定')))
      await waitFor(() => user.click(screen.getByText(/ログアウト/)))
      expect(setIsSignedIn).toBeCalledWith(false)
      expect(setIsGuest).toBeCalledWith(false)
    })

    test('画面幅が小さいときハンバーガーメニューになり設定メニューと統合されること', async () => {
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          value: 400,
        })
        window.dispatchEvent(new Event('resize'))
      })
      const menuButton = screen.getByText('メニューを開く')
      await waitFor(() => user.click(menuButton))
      expect(screen.queryByText('設定')).toBeNull()
      await waitFor(() => user.click(screen.getByText(/使い方/)))
      expect(mockedRouterPush).lastCalledWith('/#about')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/お題一覧/)))
      expect(mockedRouterPush).lastCalledWith('/themes')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/新着ベスト/)))
      expect(mockedRouterPush).lastCalledWith('/lists')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/お題を投稿/)))
      expect(mockedRouterPush).lastCalledWith('/themes/new')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/ベストを投稿/)))
      expect(mockedRouterPush).lastCalledWith('/lists/new')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/マイベスト/)))
      expect(mockedRouterPush).lastCalledWith(`/users/${userMock.id}`)
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/ユーザー設定/)))
      expect(mockedRouterPush).lastCalledWith('/account')
      await waitFor(() => user.click(menuButton))
      await waitFor(() => user.click(screen.getByText(/ログアウト/)))
      expect(setIsSignedIn).toBeCalledWith(false)
      expect(setIsGuest).toBeCalledWith(false)
    })
  })
})
