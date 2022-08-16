import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FloatingButton from 'components/commons/floatingButton'

const MockedFunction = jest.fn()
const content = <span>content</span>

describe('FloatingButton', () => {
  test('contentが表示されること', async () => {
    const { container } = render(<FloatingButton onClick={MockedFunction} content={content} />)
    expect(container.innerHTML).toMatch('content')
  })

  test('クリックでonClickが呼ばれること', async () => {
    render(<FloatingButton onClick={MockedFunction} content={content} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })
})
