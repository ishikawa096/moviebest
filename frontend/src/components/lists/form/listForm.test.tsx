import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import ListForm from './listForm'
import { themeMock } from 'mocks/mockData'
import { server } from 'mocks/server'

const onSave = jest.fn()

describe('ListForm', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  test('フォームに入力して送信ボタンを押せること', async () => {
    themeMock.capacity = 1
    render(<ListForm onSave={onSave} theme={themeMock} isSending={false} />)
    const button = screen.getByRole('button', { name: '作成' })
    expect(button).toBeDisabled()
    await fireEvent.change(screen.getByLabelText('1'), { target: { value: 'MO' } })
    await waitFor(() => fireEvent.click(screen.getByText('MOVIE')))
    expect(screen.findByText('MOVIE')).toBeTruthy()
    expect(button).toBeEnabled()
    await fireEvent.click(button)
    expect(onSave).toBeCalledTimes(1)
  })

  test('コメントを入力できること', async () => {
    render(<ListForm onSave={onSave} theme={themeMock} isSending={false} />)
    const user = userEvent.setup()
    const commentArea = screen.getByRole('textbox', { name: 'コメント' }) as HTMLTextAreaElement
    await waitFor(() => user.type(commentArea, 'test'))
    expect(commentArea.value).toMatch(/test/)
  })

  test('capacity数と同じ数のmovie入力欄があること', async () => {
    themeMock.capacity = 10
    render(<ListForm onSave={onSave} theme={themeMock} isSending={false} />)
    const movieSelect = screen.getAllByText('ここに映画のタイトルを入力')
    expect(movieSelect).toHaveLength(10)
  })
})
