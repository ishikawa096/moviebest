import { render, screen } from '@testing-library/react'
import About from './about'

describe('About', () => {
  beforeEach(() => {
    render(<About />)
  })

  test('アプリの説明があること', async () => {
    expect(screen.getByRole('heading', { name: /映画なんでもベストとは？/ })).toBeTruthy()
    expect(screen.getByRole('heading', { name: /使い方/ })).toBeTruthy()
  })

  test('補足画像があること', async () => {
    expect(screen.getByRole('img', { name: /作成画面/ })).toBeTruthy()
    expect(screen.getByRole('img', { name: /お題作成/ })).toBeTruthy()
    expect(screen.getByRole('img', { name: /ツイート/ })).toBeTruthy()
  })
})
