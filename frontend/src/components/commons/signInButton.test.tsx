import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignInButton from 'components/commons/signInButton'

const MockedFunction = jest.fn()

describe('SignInButton', () => {
  test('text propの文字列が表示されること', async () => {
    const { container } = render(<SignInButton onClick={MockedFunction} isSending={false} disabled={false} text='Button' color='color' />)
    expect(container.innerHTML).toMatch('Button')
  })

  test('クリックでonClickが呼ばれること', async () => {
    render(<SignInButton onClick={MockedFunction} isSending={false} disabled={false} text='Button' color='color' />)
    const button = screen.getByRole('button', { name: 'Button' })
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })

  test('isSendingがtrueの時loading状態になっていること', async () => {
    const { container } = render(<SignInButton onClick={MockedFunction} isSending={true} disabled={false} text='Button' color='color' />)
    expect(container.innerHTML).toMatch('処理中')
  })

  test('disabledがfalseのときボタンを押せること', async () => {
    render(<SignInButton onClick={MockedFunction} isSending={false} disabled={false} text='Button' color='color' />)
    expect(screen.getByRole('button', { name: 'Button' })).toBeEnabled()
  })

  test('disabledがtrueのとき押せないこと', async () => {
    render(<SignInButton onClick={MockedFunction} isSending={false} disabled={true} text='Button' color='color' />)
    expect(screen.getByRole('button', { name: 'Button' })).toBeDisabled
  })
})
