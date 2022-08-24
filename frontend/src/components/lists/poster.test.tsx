import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Poster from './poster'
import { movieMock } from 'mocks/mockData'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

describe('Poster', () => {
  test('画像が表示されること', async () => {
    movieMock.tmdbImage = '/imageUrl'
    render(<Poster movie={movieMock} blankImage='/asset/image/noimage.png' />)
    expect(screen.getByRole('img').attributes.getNamedItem('src')?.value).toMatch(/imageUrl/)
  })

  test('ホバーするとタイトルが表示されること', async () => {
    render(<Poster movie={movieMock} blankImage='/asset/image/noimage.png' />)
    expect(screen.getByText(movieMock.title)).toHaveClass('hover:opacity-100')
  })

  test('movieのtmdbImageが空のとき/noimage.pngが表示されること', async () => {
    movieMock.tmdbImage = ''
    render(<Poster movie={movieMock} blankImage='/asset/image/noimage.png' />)
    expect(screen.getByRole('img').attributes.getNamedItem('src')?.value).toBe('/asset/image/noimage.png')
  })

  test('movieのtmdbImageが空のときデフォルトでタイトルが表示されること', async () => {
    movieMock.tmdbImage = ''
    render(<Poster movie={movieMock} blankImage='/asset/image/noimage.png' />)
    expect(screen.getByText(movieMock.title)).not.toHaveClass('opacity-0')
    expect(screen.getByText(movieMock.title)).not.toHaveClass('hover:opacity-100')
  })
})
