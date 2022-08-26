import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TweetWrapper from './tweetWrapper'
import { movieMock } from 'mocks/mockData'

const themeTitle = 'THEME'
const movies = [movieMock]
const children = <span>children</span>

describe('TweetWrapper', () => {
  test('Tweetのリンクがあること', async () => {
    render(
      <TweetWrapper themeTitle={themeTitle} movies={movies}>
        {children}
      </TweetWrapper>
    )
    expect(screen.getByText(/children/).closest('a')).toHaveAttribute('href', 'https://twitter.com/intent/tweet?url=https://test.com/lists/1&text=1.%20MOVIE%0a&hashtags=THEME')
  })
})
