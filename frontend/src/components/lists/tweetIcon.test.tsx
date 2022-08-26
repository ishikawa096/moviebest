import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TweetIcon from './tweetIcon'
import { movieMock } from 'mocks/mockData'

const movies = [movieMock]

describe('TweetIcon', () => {
  test('アイコンがリンクになっていること', async () => {
    render(<TweetIcon themeTitle='title' movies={movies} />)
    expect(screen.getByRole('link')).toBeTruthy()
  })
})
