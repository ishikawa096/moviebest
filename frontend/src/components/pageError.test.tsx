import { render, screen } from '@testing-library/react'
import PageError from './pageError'

describe('PageError', () => {
  beforeEach(() => {
    render(<PageError error={404} />)
  })

  test('エラーが表示されること', async () => {
    expect(screen.getByText(/404/)).toBeInTheDocument
    expect(screen.getByText(/ページが見つかりません/)).toBeInTheDocument
  })
})
