import { render, screen, fireEvent } from '@testing-library/react'
import LargeButton from './largeButton'

const MockedFunction = jest.fn()

describe('LargeButton', () => {
  test('text propの文字列が表示されること', async () => {
    const { container } = render(<LargeButton onClick={MockedFunction} title='Button' />)
    expect(container.innerHTML).toMatch('Button')
  })

  test('クリックでonClickが呼ばれること', async () => {
    render(<LargeButton onClick={MockedFunction} title='Button' />)
    const button = screen.getByRole('button', { name: 'Button' })
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })
})
