import { listMock, passwordMock, signUpMock, themeMock, userEditMock } from 'mocks/mockData'
import { validateList, validatePassword, validateSignUp, validateTheme, validateUserEdit } from './validations'

describe('validations', () => {
  describe('validateTheme', () => {
    test('タイトルが空だとエラーが出ること', async () => {
      expect(validateTheme({ ...themeMock, title: '' }).title).toMatch(/入力してください/)
      expect(validateTheme({ ...themeMock, title: ' ' }).title).toMatch(/入力してください/)
    })

    test('タイトルが100字以上だとエラーが出ること', async () => {
      expect(validateTheme({ ...themeMock, title: `${[...Array(101)].fill('a')}` }).title).toMatch(/文字までです/)
    })

    test('capacityが2未満だとエラーが出ること', async () => {
      expect(validateTheme({ ...themeMock, capacity: 1 }).capacity).toMatch(/作品数は/)
    })

    test('capacityが11以上だとエラーが出ること', async () => {
      expect(validateTheme({ ...themeMock, capacity: 11 }).capacity).toMatch(/作品数は/)
    })
  })

  describe('validateList', () => {
    test('moviesに空があるとエラーが出ること', async () => {
      expect(validateList({ ...listMock, movies: [{ title: '', position: 0 }] }).movies).toMatch(/入力してください/)
    })
  })

  describe('validateSignUp', () => {
    test('nameが空だとエラーが出ること', async () => {
      expect(validateSignUp({ ...signUpMock, name: '' }).name).toMatch(/必須です/)
      expect(validateSignUp({ ...signUpMock, name: ' ' }).name).toMatch(/必須です/)
    })
    test('nameが31字以上だとエラーが出ること', async () => {
      expect(validateSignUp({ ...signUpMock, name: `${[...Array(31)].fill('a')}` }).name).toMatch(/字までです/)
    })

    test('emailが空だとエラーが出ること', async () => {
      expect(validateSignUp({ ...signUpMock, email: '' }).email).toMatch(/必須です/)
      expect(validateSignUp({ ...signUpMock, email: ' ' }).email).toMatch(/必須です/)
    })

    test('無効なemailだとエラーが出ること', async () => {
      expect(validateSignUp({ ...signUpMock, email: 'invalidEmail' }).email).toMatch(/形式が正しくありません/)
    })

    test('パスワードが6字未満だとエラーが出ること', async () => {
      expect(validateSignUp({ ...signUpMock, password: '12345' }).password).toMatch(/字以上必要です/)
    })

    test('確認パスワードが空だとエラーが出ること', async () => {
      expect(validateSignUp({ ...signUpMock, passwordConfirmation: '' }).passwordConfirmation).toMatch(/必須です/)
    })

    test('確認パスワードが一致しないとエラーが出ること', async () => {
      expect(validateSignUp({ ...signUpMock, password: 'disney', passwordConfirmation: 'warner' }).passwordConfirmation).toMatch(/一致しません/)
    })
  })

  describe('validatePassword', () => {
    test('パスワードが6字未満だとエラーが出ること', async () => {
      expect(validatePassword({ ...passwordMock, password: '12345' }).password).toMatch(/字以上必要です/)
    })

    test('確認パスワードが一致しないとエラーが出ること', async () => {
      expect(validatePassword({ ...passwordMock, password: 'disney', passwordConfirmation: 'warner' }).passwordConfirmation).toMatch(/一致しません/)
    })
  })

  describe('validateUserEdit', () => {
    test('nameが空だとエラーが出ること', async () => {
      expect(validateUserEdit({ ...userEditMock, name: '' }).name).toMatch(/必須です/)
      expect(validateUserEdit({ ...userEditMock, name: ' ' }).name).toMatch(/必須です/)
    })

    test('無効なemailだとエラーが出ること', async () => {
      expect(validateUserEdit({ ...userEditMock, email: 'invalidEmail' }).email).toMatch(/形式が正しくありません/)
    })
  })
})
