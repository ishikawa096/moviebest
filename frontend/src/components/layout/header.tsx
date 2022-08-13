import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from 'pages/_app'
import { signOut } from 'lib/api/auth'
import { toastSuccess, toastError } from 'lib/toast'
import HeaderButton from 'components/commons/headerButton'
import Hamburger from 'components/commons/hamburger'
import { useWindowWidth } from 'lib/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const [settingOpen, setSettingOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const width = useWindowWidth()

  useEffect(() => {
    if (width >= 768) {
      setMenuOpen(false)
    }
    if (width < 768) {
      setSettingOpen(false)
    }
  }, [width])

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(false)
    setSettingOpen(false)
    try {
      const res = await signOut()
      if (res.data.success === true) {
        setIsSignedIn(false)
        toastSuccess('ログアウトしました')
        router.push('/')
      } else {
        toastError('ログアウトできませんでした')
      }
    } catch (err) {
      toastError('ログアウトできませんでした')
    }
  }

  const handleLink = (path: string) => {
    router.push(path)
    setMenuOpen(false)
    setSettingOpen(false)
  }

  const NavItem = ({ path, name }: { path: string; name: string | React.ReactNode }) => (
    <div className='flex items-center text-center w-full md:w-auto'>
      <button
        onClick={() => handleLink(path)}
        className='block w-full py-3 whitespace-nowrap text-base text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 decoration-transparent hover:decoration-sky-400 md:p-0 hover:underline decoration-4 duration-300'
      >
        {name}
      </button>
    </div>
  )

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn && currentUser) {
        return (
          <>
            {menuOpen ? undefined : (
              <>
                <button
                  onClick={() => setSettingOpen(!settingOpen)}
                  className='block w-full py-2 px-4 whitespace-nowrap text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 decoration-transparent hover:decoration-sky-400 md:p-0 hover:underline decoration-4 duration-300'
                >
                  設定
                </button>
                <HeaderButton text='投稿' onClick={() => handleLink('/lists/new')} color='color' />
              </>
            )}
            {!settingOpen && menuOpen ? (
              <NavItem
                name={
                  <>
                    <FontAwesomeIcon icon={faPen} className='px-1' />
                    投稿する
                  </>
                }
                path='/lists/new'
              />
            ) : null}
            {settingOpen || menuOpen ? (
              <div className='w-full shadow-lg md:space-y-7 md:w-60 md:py-8 md:z-20 md:absolute md:top-14 md:right-3 md:bg-white md:border-b'>
                <NavItem name='マイベスト' path={`/users/${currentUser.id}`} />
                <NavItem name='ユーザー設定' path='/account' />
                <div className='flex items-center md:justify-center w-full'>
                  <button
                    onClick={handleSignOut}
                    className='block w-full py-3 px-4 whitespace-nowrap text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 decoration-transparent hover:decoration-sky-400 md:p-0 hover:underline decoration-4 duration-300'
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            ) : undefined}
          </>
        )
      } else {
        return (
          <>
            <div className='w-full flex flex-col md:flex-row items-center'>
              <HeaderButton text='ログイン' onClick={() => handleLink('/signin')} color='white' />
              <HeaderButton text='新規登録' onClick={() => handleLink('/signup')} color='color' />
            </div>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <header className='font-base w-screen'>
      <nav className='bg-white border-gray-200 border-b px-2 sm:px-4 py-2.5 rounded'>
        <div className='container flex flex-row items-center justify-between mx-auto'>
          <div>
            <Link href='/' className='flex items-center'>
              <a className='self-center text-xl font-logo whitespace-nowrap'>
                映画<span className='text-base'>なんでも</span>ベスト
              </a>
            </Link>
          </div>
          <Hamburger onClick={() => setMenuOpen(!menuOpen)} isOpen={menuOpen} />
          <div className={`w-full md:block md:w-auto md:pl-3 ${menuOpen ? 'block z-20 absolute top-14 right-0 bg-white' : 'hidden'}`}>
            <div className='flex flex-col items-center shadow-lg md:shadow-none md:flex-row md:space-x-5 md:mt-0 md:text-sm md:font-medium md:w-auto'>
              <NavItem name='使い方' path='/#about' />
              <NavItem name='新着ベスト' path='/lists' />
              <NavItem name='お題をみる' path='/themes' />
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
