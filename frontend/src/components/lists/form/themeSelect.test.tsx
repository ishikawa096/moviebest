import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ThemeSelect from './themeSelect'
import { themeMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'

const mockedOnSave = jest.fn()

describe('ThemeSelect', () => {
  test('セレクトボックスから選択できること', async () => {
    const user = userEvent.setup()
    render(<ThemeSelect onChange={mockedOnSave} themes={[themeMock]} />)
    expect(screen.queryByText('THEME')).toBeNull
    await waitFor(() => user.click(screen.getByRole('combobox')))
    await waitFor(() => fireEvent.click(screen.getByText('THEME')))
    expect(screen.getByText('THEME')).toBeTruthy
  })

  test('props themeがあるときデフォルトで表示されること', async () => {
    render(<ThemeSelect onChange={mockedOnSave} themes={[themeMock]} theme={themeMock} />)
    expect(screen.getByText('THEME')).toBeTruthy
  })
})
