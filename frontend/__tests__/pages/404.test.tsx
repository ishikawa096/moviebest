import { render, screen } from '@testing-library/react'
import Custom404 from 'pages/404'

describe('PageError', () => {
  beforeEach(() => {
    render(<Custom404 />)
  })

  test('エラーが表示されること', async () => {
    expect(screen.getByText(/404/)).toBeInTheDocument
    expect(screen.getByText(/ページが見つかりません/)).toBeInTheDocument
  })
})
