import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CloseButton from 'components/commons/closeButton'

const MockedFunction = jest.fn()

describe('CloseButton', () => {
  test('クリックでonClickが呼ばれること', async () => {
    render(<CloseButton onClick={MockedFunction} srOnly='text' />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })
})
