import { render, screen, waitFor } from '@testing-library/react'
import ImportantModal from './importantModal'
import userEvent from '@testing-library/user-event'

const handleConfirm = jest.fn()
const handleCancel = jest.fn()

describe('ImportantModal', () => {
  const user = userEvent.setup()
  describe('showModal trueのとき', () => {
    beforeEach(() =>
      render(
        <ImportantModal
          showModal={true}
          title='削除しますか？'
          description='元に戻せません'
          confirmationText='削除する'
          cancellationText='削除しない'
          handleConfirm={() => handleConfirm()}
          handleCancel={() => handleCancel()}
        />
      )
    )
    test('文字が表示されること', async () => {
      expect(screen.getByText('削除しますか？')).toBeInTheDocument
      expect(screen.getByText('元に戻せません')).toBeInTheDocument
      expect(screen.getByText('削除する')).toBeInTheDocument
      expect(screen.getByText('削除しない')).toBeInTheDocument
    })

    test('confirmボタンを押すとhandleConfirmが呼ばれること', async () => {
      await waitFor(() =>user.click(screen.getByText('削除する')))
      expect(handleConfirm).toBeCalledTimes(1)
    })

    test('cancelボタンを押すとhandleCancelが呼ばれること', async () => {
      await waitFor(() => user.click(screen.getByText('削除しない')))
      expect(handleCancel).toBeCalledTimes(1)
    })

    test('closeボタンを押すとhandleCancelが呼ばれること', async () => {
      await waitFor(() => user.click(screen.getByText('閉じる')))
      expect(handleCancel).toBeCalledTimes(1)
    })
  })
  describe('showModal falseのとき', () => {
    test('表示されないこと', async () => {
      expect(screen.queryByText('削除しますか？')).toBeNull
    })
  })
})
