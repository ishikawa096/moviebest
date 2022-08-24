import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Posters from './posters'
import { movieMock, themeMock } from 'mocks/mockData'
import { Movie } from 'interfaces/interface'

const movies = [movieMock]

jest.mock('./poster', () => {
  const MockPoster = ({ blankImage: blankImage, movie: movie }: { blankImage: string; movie: Movie }) => (
    <div data-testid='poster'>
      {blankImage},{movie.tmdbImage}
    </div>
  )
  return MockPoster
})

describe('Posters', () => {
  test('posterが表示されること', async () => {
    render(<Posters movies={movies} theme={themeMock} blankImage='/asset/image/noimage.png' />)
    expect(screen.getByTestId('poster')).toBeTruthy
  })
})
