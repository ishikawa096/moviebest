import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ScrollButton from 'components/commons/scrollButton'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: 'scroll-icon',
}))

describe('ScrollButton', () => {
  test('スクロール前は表示されないこと', async () => {
    render(<ScrollButton />)
    expect(screen.getByRole('button')).toHaveClass('hidden')
  })

  test('スクロールしたら表示されること', async () => {
    render(
      <div style={{ height: '1000px' }}>
        <ScrollButton />
      </div>
    )
    fireEvent.scroll(window, { target: { pageYOffset: 200 } })
    expect(screen.getByRole('button')).toHaveClass('block')
  })
})
