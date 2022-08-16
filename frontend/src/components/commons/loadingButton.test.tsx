import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoadingButton from './loadingButton'

describe('LoadingButton', () => {
  beforeEach(() => {
    render(<LoadingButton />)
  })

  test('処理中と表示されること', async () => {
    const button = screen.getByRole('button')
    expect(button.innerHTML).toMatch('処理中')
  })

  test('disableであること', async () => {
    expect(screen.getByRole('button')).toBeDisabled
  })
})
