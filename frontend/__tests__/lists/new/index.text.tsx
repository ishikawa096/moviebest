import { act, renderHook, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import NewList from 'pages/lists/new/index'

describe('新規list作成', () => {
  const user = userEvent.setup()
  beforeEach(() => {
    render(<NewList />)
  })
  test.todo('フォームに入力してボタンを押せる')
  test.todo('moviesに空欄があるとバリデーションエラーが出るor送信ボタンを押せない')
  test.todo('コメントは空欄でも送信できる')
  test.todo('movieを選択すると画像が表示される')
  test.todo('movie入力欄の数がtheme.capacity数に一致')
})
