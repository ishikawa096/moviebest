import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PopularThemes from './popularThemes'
import { themeMock } from 'mocks/mockData'
import userEvent from '@testing-library/user-event'

jest.mock('components/layout/styles', () => ({
  randomBackGroundColors: ['bg-yellow-300'],
}))
jest.mock('lib/helpers', () => ({
  arrayRandom: (array: Array<any>) => 'bg-yellow-300',
}))

const themes = [themeMock]

describe('PopularThemes', () => {
  test('themeのtitleとlist数が表示されること', async () => {
    const { container } = render(<PopularThemes themes={themes} />)
    expect(container.innerHTML).toMatch('THEME')
    expect(container.innerHTML).toMatch('0')
  })

  test('クリックで一覧と作成へのリンクが出ること', async () => {
    const user = userEvent.setup()
    render(<PopularThemes themes={themes} />)
    const card = screen.getByText('THEME')
    await user.click(card)
    expect(screen.getByText(/このお題でつくる/).closest('div')).toHaveClass('block')
    expect(screen.getByText(/投稿を見る/).closest('div')).toHaveClass('block')
  })

  test('デフォルトではリンクは非表示', async () => {
    render(<PopularThemes themes={themes} />)
    const createLink = screen.getByText(/このお題でつくる/)
    const showLink = screen.getByText(/投稿を見る/)
    expect(showLink.closest('div')).toHaveClass('hidden')
    expect(createLink.closest('div')).toHaveClass('hidden')
  })
})
