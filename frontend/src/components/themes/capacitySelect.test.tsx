import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CapacitySelect from './capacitySelect'
import userEvent from '@testing-library/user-event'
import { themeMock } from 'mocks/mockData'

const MockedFunction = jest.fn()

describe('CapacitySelect', () => {
  test('デフォルトでthemeのcapacityが表示されていること', async () => {
    render(<CapacitySelect theme={themeMock} capMin={2} capMax={10} onChange={MockedFunction} />)
    const option = screen.getByRole('option', { name: '5' }) as HTMLOptionElement
    expect(option.selected).toBe(true)
  })

  test('最小数capMin,最大数capMaxのオプションが選べること', async () => {
    render(<CapacitySelect theme={themeMock} capMin={3} capMax={5} onChange={MockedFunction} />)
    expect(screen.getAllByRole('option').length).toBe(3)
    expect(screen.getByRole('option', { name: '3' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '4' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '5' })).toBeInTheDocument()
  })

  test('セレクトしてonChangeが呼ばれること', async () => {
    const user = userEvent.setup()
    render(<CapacitySelect theme={themeMock} capMin={2} capMax={10} onChange={MockedFunction} />)
    await user.selectOptions(screen.getByRole('combobox'), screen.getByRole('option', { name: '3' }))
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })

  test('formErrorがあるとき表示されること', async () => {
    const { container } = render(<CapacitySelect theme={themeMock} capMin={2} capMax={10} onChange={MockedFunction} formError='エラーがあります' />)
    expect(container.innerHTML).toMatch('エラーがあります')
  })
})
