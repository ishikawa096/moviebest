import { render, screen } from '@testing-library/react'
import SignInInput from './signInInput'
import userEvent from '@testing-library/user-event'

const MockedFunction = jest.fn()

describe('SignInInput', () => {
  test('入力してonChangeが呼ばれること', async () => {
    const user = userEvent.setup()
    render(<SignInInput value='' label='email' name='email' type='email' autoComplete='email' onChange={MockedFunction} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })

  test('formErrorがあるとき表示されること', async () => {
    const { container } = render(<SignInInput value='' label='email' name='email' type='email' autoComplete='email' onChange={MockedFunction} error='エラーがあります' />)
    expect(container.innerHTML).toMatch('エラーがあります')
  })
})
