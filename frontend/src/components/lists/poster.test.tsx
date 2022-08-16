import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Poster from './poster'
import { movieMock } from 'mocks/mockData'

describe('Poster', () => {
  test('画像が表示されること', async () => {
    render(<Poster movie={movieMock} blankImage='/' />)
    expect(screen.getByRole('img')).toBe
  })
})
