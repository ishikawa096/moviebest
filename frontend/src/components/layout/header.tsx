import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { AuthContext } from 'pages/_app'
import { signOut } from 'lib/api/auth'
import { toastSuccess, toastError } from 'lib/toast'
import HeaderButton from 'components/commons/headerButton'
import Hamburger from 'components/commons/hamburger'
import { useWindowWidth } from 'lib/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faFilePen } from '@fortawesome/free-solid-svg-icons'

const BREAKPOINT_WIDTH = 768
const LOGO_IMAGE = '/assets/images/logo.webp'

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser, setIsGuest } = useContext(AuthContext)
  const [settingOpen, setSettingOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const width = useWindowWidth()

  useEffect(() => {
    if (width >= BREAKPOINT_WIDTH) {
      setMenuOpen(false)
    }
    if (width < BREAKPOINT_WIDTH) {
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
        setIsGuest(false)
        toastSuccess('ログアウトしました')
        router.push('/')
      } else {
        toastError('ログアウトできませんでした')
      }
    } catch (err) {
      toastError('ログアウトできませんでした')
    }
  }

  const handleRouterPush = (path: string) => {
    router.push(path)
    setMenuOpen(false)
    setSettingOpen(false)
  }

  const NavItem = ({ onClick, name }: { onClick: React.MouseEventHandler<HTMLButtonElement>; name: string | React.ReactNode }) => (
    <button
      onClick={onClick}
      className='block w-full py-3 whitespace-nowrap text-bold md:text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 decoration-transparent hover:decoration-sky-400 md:p-0 hover:underline decoration-4 duration-300'
    >
      {name}
    </button>
  )

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn && currentUser) {
        return (
          <>
            {menuOpen ? undefined : (
              <>
                <NavItem name='設定' onClick={() => setSettingOpen(!settingOpen)} />
                <HeaderButton text='お題投稿' onClick={() => handleRouterPush('/themes/new')} color='white' />
                <HeaderButton text='ベスト投稿' onClick={() => handleRouterPush('/lists/new')} color='color' />
              </>
            )}
            {!settingOpen && menuOpen ? (
              <>
                <NavItem
                  name={
                    <>
                      <FontAwesomeIcon icon={faPen} className='px-1' />
                      お題を投稿
                    </>
                  }
                  onClick={() => handleRouterPush('/themes/new')}
                />
                <NavItem
                  name={
                    <>
                      <FontAwesomeIcon icon={faFilePen} className='px-1' />
                      ベストを投稿
                    </>
                  }
                  onClick={() => handleRouterPush('/lists/new')}
                />
              </>
            ) : null}
            {settingOpen || menuOpen ? (
              <div className='w-full shadow-lg md:space-y-7 md:w-96 md:py-8 md:z-20 md:absolute md:top-16 md:right-0 md:bg-white md:border-b md:motion-safe:animate-slideIn'>
                <NavItem name='マイベスト' onClick={() => handleRouterPush(`/users/${currentUser.id}`)} />
                <NavItem name='ユーザー設定' onClick={() => handleRouterPush('/account')} />
                <NavItem name='ログアウト' onClick={handleSignOut} />
              </div>
            ) : undefined}
          </>
        )
      } else {
        return (
          <div className='w-full flex flex-col md:flex-row items-center'>
            <HeaderButton text='ログイン' onClick={() => handleRouterPush('/signin')} color='white' />
            <HeaderButton text='新規登録' onClick={() => handleRouterPush('/signup')} color='color' />
          </div>
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
          <div className='z-40'>
            <Link href='/' className='flex items-center'>
              <a className='self-center whitespace-nowrap'>
                <Image src={LOGO_IMAGE} alt='映画なんでもベスト' width={150} height={30} />
              </a>
            </Link>
          </div>
          <Hamburger onClick={() => setMenuOpen(!menuOpen)} isOpen={menuOpen} />
          <div data-testid='header-menu' className={`w-full md:block md:w-auto md:pl-3 ${menuOpen ? 'block z-20 absolute top-14 right-0 bg-white motion-safe:animate-dropdown' : 'hidden'}`}>
            <div className='flex flex-col items-center shadow-lg md:shadow-none md:flex-row md:space-x-5 md:mt-0 md:text-sm md:font-medium md:w-auto'>
              <NavItem name='使い方' onClick={() => handleRouterPush('/#about')} />
              <NavItem name='お題一覧' onClick={() => handleRouterPush('/themes')} />
              <NavItem name='新着ベスト' onClick={() => handleRouterPush('/lists')} />
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
