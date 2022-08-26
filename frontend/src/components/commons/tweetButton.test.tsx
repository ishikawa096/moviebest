import { render } from '@testing-library/react'
import TweetButton from './tweetButton'
import { movieMock } from 'mocks/mockData'

const movies = [movieMock]
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: 'tweet-icon',
}))

describe('TweetButton', () => {
  test('tweetと表示されること', async () => {
    const { container } = render(<TweetButton themeTitle='' movies={movies} />)
    expect(container.innerHTML).toMatch('tweet')
  })
})
