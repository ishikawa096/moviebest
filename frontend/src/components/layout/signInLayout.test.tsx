import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignInLayout from './signInLayout'

describe('SignInLayout', () => {
  const children = <span>children</span>
  beforeEach(() => {
    render(<SignInLayout title='サインイン'>{children}</SignInLayout>)
  })

  test('childrenが表示されていること', async () => {
    expect(screen.getByText('children')).toBeTruthy()
  })
  test('タイトルが表示されていること', async () => {
    expect(screen.getByText('サインイン')).toBeTruthy()
  })
})
