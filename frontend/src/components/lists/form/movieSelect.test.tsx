import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MovieSelect from './movieSelect'
import { movieMock } from 'mocks/mockData'
import { server } from 'mocks/server'

const mockedOnSave = jest.fn()
const mockedClear = jest.fn()

describe('MovieSelect', () => {
  beforeAll(() => {
    server.listen()
  })
  afterAll(() => {
    server.close()
  })

  test('props movieにタイトルがないときプレースホルダーが表示されること', async () => {
    movieMock.title = ''
    render(<MovieSelect movie={movieMock} onChange={() => mockedOnSave()} clear={() => mockedClear()} index={3} cap={4} />)
    expect(screen.getByText(/入力/)).toBeTruthy
    expect(screen.getByRole('img', { name: 'ここに映画のタイトルを入力' })).toBeTruthy
  })

  test('props movieにタイトルがあるときデフォルトで表示されること', async () => {
    movieMock.title = 'MOVIE'
    render(<MovieSelect movie={movieMock} onChange={() => mockedOnSave()} clear={() => mockedClear()} index={3} cap={4} />)
    expect(screen.getByText('MOVIE')).toBeTruthy
    expect(screen.getByRole('img', { name: 'MOVIE' })).toBeTruthy
  })

  test('入力して検索できること', async () => {
    render(<MovieSelect movie={movieMock} onChange={() => mockedOnSave()} clear={() => mockedClear()} index={3} cap={4} />)
    await fireEvent.change(screen.getByLabelText('4'), { target: { value: 'MO' } })
    await waitFor(() => fireEvent.click(screen.getByText('MOVIE4')))
    expect(screen.findByText('MOVIE4')).toBeTruthy()
  })

  test('検索に無くても選択できること', async () => {
    render(<MovieSelect movie={movieMock} onChange={() => mockedOnSave()} clear={() => mockedClear()} index={3} cap={4} />)
    await fireEvent.change(screen.getByLabelText('4'), { target: { value: 'MOVIEEE' } })
    await waitFor(() => fireEvent.click(screen.getByText(/"MOVIEEE"を選択/)))
    expect(screen.findByText('MOVIEEE')).toBeTruthy()
  })

  test('消去ボタンを押すとclearが呼ばれること', async () => {
    render(<MovieSelect movie={movieMock} onChange={() => mockedOnSave()} clear={() => mockedClear()} index={3} cap={4} />)
    await fireEvent.click(screen.getByText('消去'))
    expect(mockedClear).toBeCalledTimes(1)
  })

  test('props index+1がcapを超えるとき非表示であること', async () => {
    render(<MovieSelect movie={movieMock} onChange={() => mockedOnSave()} clear={() => mockedClear()} index={4} cap={4} />)
    expect(screen.queryByLabelText('5')).toBeNull
  })
})
