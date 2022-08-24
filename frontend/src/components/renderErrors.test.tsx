import { render, screen } from '@testing-library/react'
import RenderErrors from './renderErrors'

describe('RenderErrors', () => {
  beforeEach(() => {
    render(<RenderErrors error='エラーがあります' />)
  })

  test('props errorが表示されること', async () => {
    expect(screen.getByText('エラーがあります')).toBeTruthy()
  })
})
