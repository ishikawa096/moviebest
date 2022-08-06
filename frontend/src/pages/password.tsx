import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import type { PasswordParams } from 'interfaces/interface'
import { toastSuccess, toastError, toastWarn } from 'lib/toast'
import { AuthContext } from 'pages/_app'
import axios from 'axios'

const PasswordPage: React.FC = () => {
  const router = useRouter()
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: PasswordParams = {
      currentPassword: currentPassword,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }

    try {
      const res = await axios.put('api/v1/auth/password', params)
      if (res.status === 200) {
        toastSuccess('パスワードを変更しました')
        router.push('/account')
      } else {
        toastError('パスワードを更新できませんでした')
      }
    } catch (err) {
      toastError('パスワードを更新できませんでした')
    }
  }

  if (!isSignedIn && currentUser === undefined) {
    router.push('/signin')
    toastWarn('ログインが必要です')
    return <></>
  }

  return (
    <>
      <h1>パスワードを変更する</h1>
      <form noValidate autoComplete='off'>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='password'
            name='current_password'
            value={currentPassword}
            autoComplete='current-password'
            onChange={(event) => setCurrentPassword(event.target.value)}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='current_password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            現在のパスワード
          </label>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            新しいパスワード
          </label>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='password'
            name='password_confirmation'
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='password_confirmation'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            確認用パスワード
          </label>
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          disabled={!currentPassword || !password || !passwordConfirmation ? true : false}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-200'
        >
          送信
        </button>
      </form>
    </>
  )
}

export default PasswordPage
