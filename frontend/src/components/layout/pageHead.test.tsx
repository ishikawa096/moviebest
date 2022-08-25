import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PageHead from './pageHead'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    },
  }
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
    }
  },
}))

describe('PageHead', () => {
  test('デフォルトのtitleがあること', async () => {
    render(<PageHead />)
    expect(document.title).toBe('映画なんでもベスト')
  })

  test('ページタイトルをtitleに含められること', async () => {
    render(<PageHead title='ページタイトル' />)
    expect(document.title).toBe('ページタイトル - 映画なんでもベスト')
  })

  test('og:titleが設定できること', () => {
    render(<PageHead title='ページタイトル' />)
    expect(document.querySelector("meta[property='og:title']")?.attributes.getNamedItem('content')?.value).toBe('ページタイトル - 映画なんでもベスト')
  })

  test('デフォルトのog:imageがあること', () => {
    render(<PageHead />)
    expect(document.querySelector("meta[property='og:image']")?.attributes.getNamedItem('content')?.value).toBe('/assets/images/summary.png')
  })

  test('デフォルトのog:urlがあること', () => {
    render(<PageHead />)
    expect(document.querySelector("meta[property='og:url']")?.attributes.getNamedItem('content')?.value).toBe('/')
  })

  test('twitter:cardが設定されていること', () => {
    render(<PageHead />)
    expect(document.querySelector("meta[name='twitter:card']")?.attributes.getNamedItem('content')?.value).toBe('summary_large_image')
  })
})
