import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PostersContainer from './postersContainer'
import { movieMock } from 'mocks/mockData'

const movies = [movieMock]

const content = <div>content</div>

describe('PostersContainer', () => {
  test('childrenが表示されること', async () => {
    render(<PostersContainer movies={movies}>{content}</PostersContainer>)
    expect(screen.getByText('content')).toBeTruthy
  })
})
