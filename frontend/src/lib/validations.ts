import type { CreateListParams, CreateThemeParams, PasswordParams, SignUpParams, UserEditParams } from 'interfaces/interface'

const emailPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/

export const validateTheme = (theme: CreateThemeParams) => {
  const errors: { [K in keyof CreateThemeParams]?: string } = {}
  if (!theme.title.trim()) {
    errors.title = 'お題を入力してください'
  }
  if (theme.title.length > 100) {
    errors.title = `お題は100文字までです(現在:${theme.title.length}文字)`
  }
  if (theme.capacity < 2 || theme.capacity > 10) {
    errors.capacity = '作品数は2〜10です'
  }
  return errors
}

export const validateList = (list: CreateListParams) => {
  const errors: { [K in keyof CreateListParams]?: string } = {}
  list.movies?.map((m) => {
    if (m.title === '') {
      errors.movies = 'タイトルを入力してください'
    }
  })
  if (list.comment && list.comment.length > 1000) {
    errors.comment = `コメントは1000文字までです(現在:${list.comment.length}文字)`
  }
  return errors
}

export const validateSignUp = (params: SignUpParams) => {
  const errors: { [K in keyof SignUpParams]?: string } = {}
  if (!params.name.trim()) {
    errors.name = 'は必須です'
  } else if (params.name.length > 30) {
    errors.name = `は30字までです(現在:${params.name.length}字)`
  }
  if (!params.email.trim()) {
    errors.email = 'は必須です'
  } else if (!emailPattern.test(params.email)) {
    errors.email = 'の形式が正しくありません'
  }
  if (!params.password.trim()) {
    errors.password = 'は必須です'
  } else if (params.password.length < 6) {
    errors.password = 'は6文字以上必要です'
  }
  if (!params.passwordConfirmation.trim()) {
    errors.passwordConfirmation = 'は必須です'
  } else if (params.password !== params.passwordConfirmation) {
    errors.passwordConfirmation = 'が一致しません'
  }
  return errors
}

export const validatePassword = (params: PasswordParams) => {
  const errors: { [K in keyof PasswordParams]?: string } = {}
  if (params.password.length < 6) {
    errors.password = 'は6文字以上必要です'
  }
  if (params.password !== params.passwordConfirmation) {
    errors.passwordConfirmation = 'が一致しません'
  }
  return errors
}

export const validateUserEdit = (params: UserEditParams) => {
  const errors: { [K in keyof UserEditParams]?: string } = {}
  if (!params.name?.trim()) {
    errors.name = 'は必須です'
  }
  if (!params.email?.trim()) {
    errors.email = 'は必須です'
  } else if (!emailPattern.test(params.email)) {
    errors.email = 'の形式が正しくありません'
  }
  return errors
}
