import { render, screen } from '@testing-library/react'
import Custom500 from 'pages/500'

describe('PageError', () => {
  beforeEach(() => {
    render(<Custom500 />)
  })

  test('エラーが表示されること', async () => {
    expect(screen.getByText(/500/)).toBeInTheDocument
    expect(screen.getByText(/サーバーエラー/)).toBeInTheDocument
  })
})
