import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TweetButton from './tweetButton'
import { movieMock } from 'mocks/mockData'

const movies = [movieMock]

describe('TweetButton', () => {
  test('tweetと表示されること', async () => {
    const { container } = render(<TweetButton themeTitle='' movies={movies} />)
    expect(container.innerHTML).toMatch('tweet')
  })
})
