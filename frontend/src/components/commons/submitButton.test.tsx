import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SubmitButton from 'components/commons/submitButton'

const MockedFunction = jest.fn()

describe('SubmitButton', () => {
  test('title propの文字列が表示されること', async () => {
    const { container } = render(<SubmitButton onClick={MockedFunction} isSending={false} disabled={false} title='ButtonTitle' />)
    expect(container.innerHTML).toMatch('ButtonTitle')
  })

  test('クリックでonClickが呼ばれること', async () => {
    render(<SubmitButton onClick={MockedFunction} isSending={false} disabled={false} title='Button' />)
    const button = screen.getByRole('button', { name: 'Button' })
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })

  test('isSendingがtrueの時loading状態になっていること', async () => {
    const { container } = render(<SubmitButton onClick={MockedFunction} isSending={true} disabled={false} title='Button' />)
    expect(container.innerHTML).toMatch('処理中')
  })

  test('disabledがfalseのときボタンを押せること', async () => {
    render(<SubmitButton onClick={MockedFunction} isSending={false} disabled={false} title='Button' />)
    expect(screen.getByRole('button', { name: 'Button' })).toBeEnabled()
  })

  test('disabledがtrueのとき押せないこと', async () => {
    render(<SubmitButton onClick={MockedFunction} isSending={false} disabled={true} title='Button' />)
    expect(screen.getByRole('button', { name: 'Button' })).toBeDisabled
  })
})
