import { render, screen } from '@testing-library/react'
import ListPageButton from './listPageButton'
import { movieMock, themeMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'

const movies = [movieMock]
const theme = themeMock
const mockedFn = jest.fn()
const user = userEvent.setup()

describe('ListPageButton', () => {
  test('tweetボタンになること', async () => {
    render(<ListPageButton style='tweet' onClick={mockedFn} tweetProps={{ themeTitle: theme.title, movies: movies }} />)
    expect(screen.getAllByText(/tweet/)).toBeInTheDocument
  })

  test('編集ボタンになること', async () => {
    render(<ListPageButton style='edit' onClick={mockedFn} />)
    expect(screen.getByText(/edit/)).toBeInTheDocument
    await user.click(screen.getByText(/edit/))
    expect(mockedFn).toBeCalledTimes(1)
  })

  test('削除ボタンになること', async () => {
    render(<ListPageButton style='delete' onClick={mockedFn} />)
    expect(screen.getByText(/delete/)).toBeInTheDocument
    await user.click(screen.getByText(/delete/))
    expect(mockedFn).toBeCalledTimes(1)
  })
})
