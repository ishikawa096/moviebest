import Link from 'next/link'
import { useSignIn } from 'components/useSignIn'

const SignIn: React.FC = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleGuestSubmit,
  } = useSignIn()

  return (
    <>
      <form noValidate autoComplete='off'>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            Email
          </label>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            autoComplete='current-password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            パスワード
          </label>
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          disabled={!email || !password ? true : false}
          className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          ログイン
        </button>
        <div>
        <button
          type='submit'
          onClick={handleGuestSubmit}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          ゲストログイン
        </button>
        </div>
        <div>
          <p>アカウントをお持ちではない方は</p>
          <Link href='/signup'>
            <a>新規アカウント作成</a>
          </Link>
        </div>
      </form>
    </>
  )
}

export default SignIn
