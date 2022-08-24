import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CommentArea from './commentArea'
import userEvent from '@testing-library/user-event'

const MockedFunction = jest.fn()

describe('CommentArea', () => {
  test('入力してonChangeが呼ばれること', async () => {
    const user = userEvent.setup()
    render(<CommentArea comment='COMMENT' onChange={MockedFunction} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })

  test('props commentが表示されること', async () => {
    render(<CommentArea comment='COMMENT' onChange={MockedFunction} />)
    expect(screen.getByText('COMMENT')).toBeTruthy
  })

  test('プレースホルダーが表示されること', async () => {
    render(<CommentArea comment='' onChange={MockedFunction} />)
    expect(screen.getByPlaceholderText(/コメント/)).toBeTruthy
  })

  test('formErrorがあるとき表示されること', async () => {
    render(<CommentArea comment='COMMENT' onChange={MockedFunction} formError='エラーがあります' />)
    expect(screen.getByText('エラーがあります')).toBeTruthy
  })
})
