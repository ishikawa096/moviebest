import { render, screen, fireEvent } from '@testing-library/react'
import Hamburger from 'components/commons/hamburger'
import '@testing-library/jest-dom/extend-expect'

const MockedFunction = jest.fn()

describe('Hamburger', () => {
  test('isOpenがfalseのときメニューアイコンが表示されること', async () => {
    render(<Hamburger onClick={MockedFunction} isOpen={false} />)
    expect(screen.getByTestId('opening-icon')).toHaveClass('hidden')
    expect(screen.getByTestId('closing-icon')).toHaveClass('block')
  })

  test('isOpenがtrueのとき閉じるアイコンが表示されること', async () => {
    render(<Hamburger onClick={MockedFunction} isOpen={true} />)
    expect(screen.getByTestId('opening-icon')).toHaveClass('block')
    expect(screen.getByTestId('closing-icon')).toHaveClass('hidden')
  })

  test('クリックでonClickが呼ばれること', async () => {
    render(<Hamburger onClick={MockedFunction} isOpen={false} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })
})
