import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ListCardButton from './listCardButton'
import { movieMock, themeMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'

const movies = [movieMock]
const theme = themeMock
const mockedFn = jest.fn()

describe('ListCardButton', () => {
  const user = userEvent.setup()
  test('ツイートボタンになること', async () => {
    render(<ListCardButton style='tweet' onClick={mockedFn} title='ツイート' tweetProps={{ themeTitle: theme.title, movies: movies }} />)
    expect(screen.getByRole('link')).toBeInTheDocument
  })

  test('editボタンになること', async () => {
    render(<ListCardButton style='edit' onClick={mockedFn} title='編集' />)
    await user.click(screen.getByRole('button'))
    expect(mockedFn).toBeCalledTimes(1)
  })

  test('deleteボタンになること', async () => {
    render(<ListCardButton style='delete' onClick={mockedFn} title='削除' />)
    await user.click(screen.getByRole('button'))
    expect(mockedFn).toBeCalledTimes(1)
  })
})
