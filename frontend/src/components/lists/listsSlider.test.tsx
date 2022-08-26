import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ListsSlider from './listsSlider'
import { listMock, themeMock, userMock } from 'mocks/mockData'
import { Movie, Theme, User } from 'interfaces/interface'

const lists = [{ ...listMock, theme: themeMock, user: userMock }]

jest.mock('./listsSlider', () => {
  const MockListCard = ({ theme: theme, user: user, movies: movies }: { theme: Theme; user: User; movies: Array<Movie> }) => <div data-testid='list-card'></div>
  return MockListCard
})

describe('ListsSlider', () => {
  test('listCardが表示されること', async () => {
    render(<ListsSlider lists={lists} />)
    expect(screen.getByTestId('list-card')).toBeTruthy
  })
})
