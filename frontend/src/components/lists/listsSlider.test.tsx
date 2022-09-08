import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ListsSlider from './listsSlider'
import { listMock, themeMock, userMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'
import { AuthContext } from 'pages/_app'
import { server } from 'mocks/server'

const lists = [{ ...listMock, theme: themeMock, user: userMock }]
const user = userEvent.setup()

const mockedReload = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      isReady: true,
      reload: mockedReload,
    }
  },
}))

describe('ListsSlider', () => {
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
          setCurrentUser: jest.fn(),
          isGuest: false,
          setIsGuest: jest.fn(),
        }}
      >
        <ListsSlider lists={lists} />
      </AuthContext.Provider>
    )
  })

  test('titleやuser名が表示されること', async () => {
    expect(screen.getByText(themeMock.title)).toBeInTheDocument
    expect(screen.getByText(userMock.name)).toBeInTheDocument
  })

  test('listCardを削除するとrouter.reloadが呼ばれること', async () => {
    await waitFor(() => user.click(screen.getByRole('button', { name: /削除/ })))
    await waitFor(() => user.click(screen.getByText('削除する')))
    await waitFor(() => expect(mockedReload).toBeCalledTimes(1))
  })
})
