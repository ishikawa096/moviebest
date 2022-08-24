import Home from 'pages/index'
import { render, screen } from '@testing-library/react'
import { listMock, themeMock, userMock } from 'mocks/mockData'

const mockedList = { ...listMock, theme: themeMock, user: userMock }
const mockedTheme = { ...themeMock, lists: [listMock] }

jest.mock('components/lists/listsSlider', () => {
  const MockListsSlider = ({ lists: lists }: { lists: Array<typeof mockedList> }) => <div data-testid='lists-slider'>{lists.map((l) => l.theme.title)}</div>
  return MockListsSlider
})

jest.mock('components/themes/popularThemes', () => {
  const MockPopularThemes = ({ themes: themes }: { themes: Array<typeof mockedTheme> }) => <div data-testid='pop-themes'>{themes.map((t) => t.title)}</div>
  return MockPopularThemes
})

jest.mock('components/about', () => {
  const MockAbout = () => <div data-testid='about'></div>
  return MockAbout
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    }
  },
}))

describe('Home', () => {
  beforeEach(() => {
    render(<Home lists={[mockedList]} themes={[mockedTheme]} />)
  })

  test('見出しがあること', async () => {
    expect(screen.getByText('みんなの新着ベスト')).toBeInTheDocument
    expect(screen.getByText('人気のお題')).toBeInTheDocument
    expect(screen.getByText('はじめよう')).toBeInTheDocument
  })

  test('新着/人気一覧があること', async () => {
    expect(screen.getByText('みんなの新着ベスト')).toBeInTheDocument
    expect(screen.getByText('人気のお題')).toBeInTheDocument
    expect(screen.getByText('はじめよう')).toBeInTheDocument
    expect(screen.getByTestId('lists-slider')).toBeInTheDocument
    expect(screen.getByTestId('pop-themes')).toBeInTheDocument
  })

  test('aboutセクションがあること', async () => {
    expect(document.querySelector('#about')).toBeTruthy
    expect(screen.getByTestId('about')).toBeInTheDocument
  })

  test('各ボタンがあること', async () => {
    expect(screen.getByRole('button', { name: '新着をもっと見る' })).toBeInTheDocument
    expect(screen.getByRole('button', { name: 'お題をもっと見る' })).toBeInTheDocument
    expect(screen.getByRole('button', { name: 'お題をつくる' })).toBeInTheDocument
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument
    expect(screen.getByRole('button', { name: '新規登録' })).toBeInTheDocument
  })
})
