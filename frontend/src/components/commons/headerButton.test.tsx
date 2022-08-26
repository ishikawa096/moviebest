import { render, screen, fireEvent } from '@testing-library/react'
import HeaderButton from './headerButton'

const MockedFunction = jest.fn()

describe('HeaderButton', () => {
  test('text propの文字列が表示されること', async () => {
    const { container } = render(<HeaderButton onClick={MockedFunction} text='Button' color='color' />)
    expect(container.innerHTML).toMatch('Button')
  })

  test('クリックでonClickが呼ばれること', async () => {
    render(<HeaderButton onClick={MockedFunction} text='Button' color='color' />)
    const button = screen.getByRole('button', { name: 'Button' })
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })
})
