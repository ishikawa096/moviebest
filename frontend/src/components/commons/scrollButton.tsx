import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJetFighterUp } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const PAGE_Y_OFFSET = 100

const ScrollButton = () => {
  const [show, setShow] = useState<boolean>(false)
  const content = (
    <>
      <FontAwesomeIcon icon={faJetFighterUp} />
      <span className='sr-only'>上へスクロール</span>
    </>
  )

  const changeShow = () => {
    if (window.pageYOffset > PAGE_Y_OFFSET) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', changeShow)
    return () => window.removeEventListener('scroll', changeShow)
  }, [])

  return (
    <button
      onClick={onScrollTop}
      className={`${show ? 'block motion-safe:animate-fade' : 'hidden'} fixed z-[90] bottom-3 md:bottom-8 left-3 md:left-8 text-2xl md:text-3xl
          drop-shadow-lg flex justify-center items-center text-sky-500 border-2 p-2 border-sky-500 hover:border-sky-400 rounded-full
          hover:text-sky-400 hover:-translate-y-1.5 duration-150 ease-in-out`}
    >
      <>{content}</>
    </button>
  )
}
export default ScrollButton
