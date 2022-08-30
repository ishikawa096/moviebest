import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ListCard from './listCard'
import { moviesMock, themeMock, userMock } from 'mocks/mockData'

const movies = moviesMock
const noImage = '/assets/images/noimage.webp'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

describe('ListCard', () => {
  test('moviesタイトルと画像、themeタイトル、user名が表示されること', async () => {
    movies[0].tmdbImage = '/imageUrl'
    render(<ListCard movies={movies} theme={themeMock} user={userMock} />)
    expect(screen.getAllByText(/MOVIE/)).toHaveLength(5)
    expect(screen.getByRole('img').attributes.getNamedItem('src')?.value).toMatch(/imageUrl/)
    expect(screen.getByText(themeMock.title)).toBeTruthy
    expect(screen.getByText(userMock.name)).toBeTruthy
  })

  test('リンクがあること', async () => {
    render(<ListCard movies={movies} theme={themeMock} user={userMock} />)
    expect(screen.getByRole('link', { name: themeMock.title })).toHaveAttribute('href', `/themes/${themeMock.id}`)
    expect(screen.getByRole('link', { name: userMock.name })).toHaveAttribute('href', `/users/${userMock.id}`)
  })

  test('一番目のmovieのtmdbImageが空のときnoImage画像が表示されること', async () => {
    movies[0].tmdbImage = ''
    render(<ListCard movies={movies} theme={themeMock} user={userMock} />)
    expect(screen.getByRole('img').attributes.getNamedItem('src')?.value).toBe(noImage)
  })
})
