import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ListCard from './listCard'
import { moviesMock, themeMock, userMock } from 'mocks/mockData'
import { AuthContext } from 'pages/_app'
import { server } from 'mocks/server'
import userEvent from '@testing-library/user-event'

const movies = moviesMock
const noImage = '/assets/images/noimage.webp'
const otherUser = { ...userMock, id: userMock.id + 1 }
const mockedDelete = jest.fn()

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

jest.mock('next/router', () => ({
  useRouter() {
    return {
      isReady: true,
      push: jest.fn(),
    }
  },
}))

describe('ListCard', () => {
  const user = userEvent.setup()

  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  describe('自分以外の投稿のとき', () => {
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
          <ListCard movies={movies} theme={themeMock} user={otherUser} />
        </AuthContext.Provider>
      )
    )
    test('moviesタイトルと画像、themeタイトル、user名が表示されること', async () => {
      expect(screen.getAllByText(/MOVIE/)).toHaveLength(5)
      expect(screen.getByRole('img').attributes.getNamedItem('src')?.value).toMatch(/image.tmdb/)
      expect(screen.getByText(themeMock.title)).toBeTruthy
      expect(screen.getByText(userMock.name)).toBeTruthy
    })

    test('リンクがあること', async () => {
      expect(screen.getByRole('link', { name: themeMock.title })).toHaveAttribute('href', `/themes/${themeMock.id}`)
      expect(screen.getByRole('link', { name: otherUser.name })).toHaveAttribute('href', `/users/${otherUser.id}`)
    })

    test('ツイートボタンがあること', async () => {
      expect(screen.getByRole('button', { name: /ツイート/ })).toBeInTheDocument
    })
    test('編集、削除ボタンがないこと', async () => {
      expect(screen.queryByRole('button', { name: /編集/ })).toBeNull
      expect(screen.queryByRole('button', { name: /削除/ })).toBeNull
    })
  })

  describe('自分の投稿のとき', () => {
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
          <ListCard movies={movies} theme={themeMock} user={userMock} onDelete={mockedDelete} />
        </AuthContext.Provider>
      )
    )
    test('ツイートボタンがあること', async () => {
      expect(screen.getByRole('button', { name: /ツイート/ })).toBeInTheDocument
    })

    test('編集、削除ボタンがあること', async () => {
      expect(screen.getByRole('button', { name: /編集/ })).toBeInTheDocument
      expect(screen.getByRole('button', { name: /削除/ })).toBeInTheDocument
    })

    test('削除するとonDeleteが呼ばれること', async () => {
      await waitFor(() => user.click(screen.getByRole('button', { name: /削除/ })))
      expect(screen.getByText( '削除する')).toBeInTheDocument
      await waitFor(() => user.click(screen.getByText('削除する')))
      expect(mockedDelete).toBeCalledTimes(1)
    })
  })

  test('一番目のmovieのtmdbImageが空のときnoImage画像が表示されること', async () => {
    movies[0].tmdbImage = ''
    render(<ListCard movies={movies} theme={themeMock} user={userMock} />)
    expect(screen.getByRole('img').attributes.getNamedItem('src')?.value).toBe(noImage)
  })
})
