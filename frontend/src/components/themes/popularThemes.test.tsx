import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PopularThemes from './popularThemes'
import { themeMock } from 'mocks/mockData'

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

  test('ランダムな背景色があること', async () => {
    const { container } = render(<PopularThemes themes={themes} />)
    expect(container.innerHTML).toMatch('bg-yellow-300')
  })
})
