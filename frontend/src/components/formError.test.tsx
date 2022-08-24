import { render, screen } from '@testing-library/react'
import FormError from './formError'

describe('FormError', () => {
  beforeEach(() => {
    render(<FormError error='エラーがあります' />)
  })

  test('props errorが表示されること', async () => {
    expect(screen.getByText('エラーがあります')).toBeTruthy()
  })
})
