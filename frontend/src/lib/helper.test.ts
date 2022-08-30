import { themeMock } from 'mocks/mockData'
import { isEmptyObject, sortByNewest } from './helpers'

describe('Helpers', () => {
  describe('isEmptyObject', () => {
    test('オブジェクトが空ならtrueになること', async () => {
      expect(isEmptyObject({})).toBe(true)
      expect(isEmptyObject({ something: 'something' })).toBe(false)
    })
  })

  describe('sortByNewest', () => {
    test('createdAtが新しい順に並ぶこと', async () => {
      const array = [
        { ...themeMock, createdAt: new Date('2022-01-01') },
        { ...themeMock, createdAt: new Date('2022-01-02') },
        { ...themeMock, createdAt: new Date('2022-01-03') },
      ]
      expect(sortByNewest(array)[0].createdAt.toString()).toMatch(/Jan 03 2022/)
    })
  })
})
