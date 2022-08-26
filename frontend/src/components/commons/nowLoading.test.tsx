import { render, screen } from '@testing-library/react'
import NowLoading from './nowLoading'

describe('NowLoading', () => {
  beforeEach(() => {
    render(<NowLoading />)
  })

  test('ローディング中と表示されること', async () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument
  })
})
