import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { listMock, themeMock, userMock } from 'mocks/mockData'
import { Movie, Theme, User } from 'interfaces/interface'
import ListsContainer from './listsContainer'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

const lists = [{ ...listMock, theme: themeMock, user: userMock }]

jest.mock('./listCard', () => {
  const MockListCard = ({}: { theme: Theme; user: User; movies: Array<Movie> }) => <div data-testid='list-card'></div>
  return MockListCard
})

jest.mock('components/commons/scrollButton', () => {
  const MockScrollButton = () => <button data-testid='scroll-button'></button>
  return MockScrollButton
})

describe('ListsContainer', () => {
  test('画面に入らないときlistCardが表示されないこと', async () => {
    render(<ListsContainer lists={lists} />)
    expect(screen.queryByTestId('list-card')).toBeNull
  })
  test('画面に入るとlistCardが表示されること', async () => {
    render(<ListsContainer lists={lists} />)
    mockAllIsIntersecting(true)
    expect(screen.queryByTestId('list-card')).toBeNull
  })
})
