import { act, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Header from './header'
import { userMock } from 'mocks/mockData'
import { AuthContext } from 'pages/_app'
import userEvent from '@testing-library/user-event'
import { server } from 'mocks/server'

const setIsSignedIn = jest.fn()
const setIsGuest = jest.fn()

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
    test('画面幅が小さいときハンバーガーメニューになること', async () => {
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          value: 400,
        })
        window.dispatchEvent(new Event('resize'))
      })
      expect(screen.getByTestId('header-menu')).toHaveClass('hidden')
      await waitFor(() => user.click(screen.getByText('メニューを開く')))
      expect(screen.getByTestId('header-menu')).toHaveClass('block')
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

    test('設定をクリックして設定メニューが開くこと', async () => {
      await waitFor(() => user.click(screen.getByText('設定')))
      expect(screen.getByText(/マイベスト/)).toBeTruthy()
      expect(screen.getByText(/ユーザー設定/)).toBeTruthy()
      expect(screen.getByText(/ログアウト/)).toBeTruthy()
    })

    test('画面幅が小さいときハンバーガーメニューになり設定ボタンは無いこと', async () => {
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          value: 400,
        })
        window.dispatchEvent(new Event('resize'))
      })
      expect(screen.getByTestId('header-menu')).toHaveClass('hidden')
      await waitFor(() => user.click(screen.getByText('メニューを開く')))
      expect(screen.getByTestId('header-menu')).toHaveClass('block')
      expect(screen.queryByText('設定')).toBeNull()
    })

    test('ログアウトできること', async () => {
      await waitFor(() => user.click(screen.getByText(/設定/)))
      await waitFor(() => user.click(screen.getByText(/ログアウト/)))
      expect(setIsSignedIn).toBeCalledWith(false)
      expect(setIsGuest).toBeCalledWith(false)
    })
  })
})
