import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ThemeForm from './themeForm'
import userEvent from '@testing-library/user-event'

const MockedFunction = jest.fn()

describe('ThemeForm', () => {
  const user = userEvent.setup()

  test('フォームに入力してsaveボタンを押せること', async () => {
    render(<ThemeForm onSave={MockedFunction} isError={false} />)
    const input = screen.getByLabelText(/お題を入力/) as HTMLInputElement
    const select = screen.getByRole('combobox') as HTMLSelectElement
    const button = screen.getByRole('button', { name: '作成' })
    await waitFor(() => user.type(input, 'TITLE'))
    await waitFor(() => user.selectOptions(select, screen.getByRole('option', { name: '3' })))
    expect(input.value).toBe('TITLE')
    expect(select.value).toBe('3')
    expect(button).toBeEnabled()
    await waitFor(() => user.click(button))
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })

  test('入力前はボタンが押せないこと', async () => {
    render(<ThemeForm onSave={MockedFunction} isError={false} />)
    const button = screen.getByRole('button', { name: '作成' })
    expect(button).toBeDisabled()
  })
})
