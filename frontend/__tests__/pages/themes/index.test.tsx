import Themes from 'pages/themes/index'
import { render, screen } from '@testing-library/react'
import { listMock, themeMock, userMock } from 'mocks/mockData'

const mockedThemes = [{ ...themeMock, lists: [{ ...listMock, user: userMock }] }]

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    }
  },
}))

describe('Themes', () => {
  beforeEach(() => {
    render(<Themes themes={mockedThemes} />)
  })

  test('ページタイトルがあること', async () => {
    expect(screen.getByRole('heading', { name: /お題一覧/ })).toBeTruthy
  })

  test('themeタイトルが表示されること', async () => {
    expect(screen.getByText(/THEME/)).toBeTruthy
  })
})
