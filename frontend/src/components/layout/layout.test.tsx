import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Layout from './layout'

describe('Layout', () => {
  const children = <span>children</span>
  beforeEach(() => {
    render(<Layout>{children}</Layout>)
  })

  test('childrenが表示されていること', async () => {
    expect(screen.getByText('children')).toBeTruthy()
  })
})
