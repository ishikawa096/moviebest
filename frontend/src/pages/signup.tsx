import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from './_app'
import { signUp } from 'lib/api/auth'
import type { SignUpParams } from 'interfaces/interface'
import { toastSuccess, toastError } from 'lib/toast'
import { setCookies } from 'lib/api/authHelper'

const SignUp: React.FC = () => {
  const router = useRouter()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        setCookies(res)
        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        router.push('/')

        toastSuccess('ログインしました')
      } else {
        toastError('emailかパスワードが違います')
      }
    } catch (err) {
      console.log(err)
      toastError('something error...')
    }
  }

  return (
    <>
      <form noValidate autoComplete='off'>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='text'
            name='floating_name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_name'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            ユーザー名
          </label>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='email'
            name='floating_email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_email'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            Email
          </label>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <input
            type='password'
            name='floating_password'
            value={password}
            autoComplete='current-password'
            onChange={(event) => setPassword(event.target.value)}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_password'
            className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7'
          >
            Password
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
            Confirm password
          </label>
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          disabled={!name || !email || !password || !passwordConfirmation ? true : false}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default SignUp
