import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Hamburger from 'components/commons/hamburger'

const MockedFunction = jest.fn()

describe('Hamburger', () => {
  test('isOpenがfalseのときメニューアイコンが表示されること', async () => {
    render(<Hamburger onClick={MockedFunction} isOpen={false} />)
    expect(screen.getByTestId('closing-icon')).toBeVisible()
  })

  test('isOpenがtrueのとき閉じるアイコンが表示されること', async () => {
    render(<Hamburger onClick={MockedFunction} isOpen={true} />)
    expect(screen.getByTestId('opening-icon')).toBeVisible()
  })

  test('クリックでonClickが呼ばれること', async () => {
    render(<Hamburger onClick={MockedFunction} isOpen={false} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(MockedFunction).toHaveBeenCalledTimes(1)
  })
})
