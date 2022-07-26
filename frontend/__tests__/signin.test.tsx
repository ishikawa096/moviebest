import { act, renderHook, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import SignIn from '../src/pages/signin'
import { useSignIn } from '../src/components/useSignIn'

describe('useSignIn', () => {
  const user = userEvent.setup()
  beforeEach(() => {
    render(<SignIn />)
  })
  test('フォームに入力してボタンを押せる', async () => {
    const inputEmail = screen.getByLabelText(/Email/) as HTMLInputElement
    const inputPassword = screen.getByLabelText(/パスワード/) as HTMLInputElement
    const button = screen.getByRole('button', { name: 'ログイン' })
    expect(button).toBeDisabled()
    await user.type(inputEmail, 'test')
    await user.type(inputPassword, 'password')
    expect(inputEmail.value).toBe('test')
    expect(inputPassword.value).toBe('password')
    expect(button).toBeEnabled()
  })
  test.todo('emailのバリデーションエラーが出る')
  test.todo('パスワードのバリデーションエラーが出る')
  test('ゲストログインボタンを押せる', async () => {
    expect(screen.getByRole('button', { name: 'ゲストログイン' })).toBeEnabled()
  })
})
