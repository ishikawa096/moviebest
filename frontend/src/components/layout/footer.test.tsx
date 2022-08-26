import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from './footer'

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  test('外部APIの利用表記が表示されていること', async () => {
    expect(screen.getByText(/This product uses the TMDB API but is not endorsed or certified by TMDB/)).toBeTruthy()
  })
})
