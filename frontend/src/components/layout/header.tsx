import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from 'pages/_app'
import { signOut } from 'lib/api/auth'
import { toastSuccess, toastError } from 'lib/toast'
import Button from 'components/commons/headerButton'
import Hamburger from 'components/commons/hamburger'
import { useWindowWidth } from 'lib/helpers'

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

  const NavItem = ({ path, name }: { path: string; name: string }) => (
    <div className='flex items-center text-center w-full md:w-auto'>
      <button
        onClick={() => handleLink(path)}
        className='block w-full py-3 whitespace-nowrap text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
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
            <NavItem path='/themes/new' name='お題をつくる' />
            {menuOpen ? undefined : (
              <button
                onClick={() => setSettingOpen(!settingOpen)}
                className='block w-full py-2 px-4 whitespace-nowrap text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
              >
                設定
              </button>
            )}
            {settingOpen || menuOpen ? (
              <div className='w-full md:space-y-7 md:w-60 md:py-4 md:z-20 md:absolute md:top-12 md:right-0 md:bg-white md:border-b'>
                <NavItem name='マイページ' path={`/users/${currentUser.id}`} />
                <NavItem name='ユーザー設定' path='/account' />
                <div className='flex items-center md:justify-center w-full'>
                  <button
                    onClick={handleSignOut}
                    className='block w-full py-3 px-4 whitespace-nowrap text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
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
              <Button text='ログイン' onClick={() => handleLink('/signin')} color='white' />
              <Button text='新規登録' onClick={() => handleLink('/signup')} color='color' />
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
            <div className='flex flex-col items-center md:flex-row md:space-x-5 md:mt-0 md:text-sm md:font-medium md:w-auto'>
              <NavItem path='/' name='使い方' />
              <NavItem path='/lists' name='新着ベスト' />
              <NavItem path='/themes' name='お題をさがす' />
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
