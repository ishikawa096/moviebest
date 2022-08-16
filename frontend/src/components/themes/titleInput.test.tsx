import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TitleInput from './titleInput'
import userEvent from '@testing-library/user-event'
import { themeMock } from 'mocks/mockData'

const MockedFunction = jest.fn()

describe('TitleInput', () => {
  test('入力してonChangeが呼ばれること', async () => {
    const user = userEvent.setup()
    render(<TitleInput theme={themeMock} onChange={MockedFunction} />)
    await user.type(screen.getByRole('textbox'), 'a')
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })

  test('formErrorがあるとき表示されること', async () => {
    const { container } = render(<TitleInput theme={themeMock} onChange={MockedFunction} formError='エラーがあります' />)
    expect(container.innerHTML).toMatch('エラーがあります')
  })
})
