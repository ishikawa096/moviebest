import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Headline from './headline'

describe('Headline', () => {
  const children = <span>children</span>
  beforeEach(() => {
    render(<Headline>{children}</Headline>)
  })

  test('childrenが表示されていること', async () => {
    expect(screen.getByText('children')).toBeTruthy()
  })
})
