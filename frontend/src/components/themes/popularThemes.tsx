import { backGroundColors } from 'lib/colors'
import { List, Theme } from 'interfaces/interface'
import { arrayRandom } from 'lib/helpers'
import Link from 'next/link'
import { MouseEventHandler, ReactElement, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
}

const PopUpItem = ({ children, path }: { children: ReactElement; path: string }) => (
  <Link href={path}>
    <a className='block flex flex-col hover:text-sky-600 hover:bg-sky-100 m-3 rounded-lg cursor-pointer duration-150'>{children}</a>
  </Link>
)

const ThemeCard = ({ theme, selected, onMouseEnter, color }: { theme: Theme & { lists: Array<List> }; selected: any; onMouseEnter: MouseEventHandler<HTMLDivElement>; color: string }) => (
  <div
    onMouseEnter={onMouseEnter}
    className={`${selected === theme.id ? 'bg-gray-700 text-gray-100' : color} ${
      theme.lists.length > 3 ? 'text-2xl md:text-4xl' : 'text-base md:text-2xl'
    } relative flex items-center font-medium px-3 py-1 hover:bg-gray-700 hover:text-gray-100 hover:shadow-sm cursor-pointer rounded-md duration-150 ease-in-out`}
  >
    {theme.title}
    <span className='rounded-full text-sm md:text-xl'>／{theme.lists.length}</span>

    <div
      className={`${
        selected === theme.id ? 'block' : 'hidden'
      } absolute top-10 min-w-[6rem] md:min-w-[10rem] flex flex-col bg-white text-center text-xs md:text-sm text-sky-500 rounded-lg z-10 shadow-lg motion-safe:animate-zoomIn`}
    >
      <span className='absolute -top-8 left-3 border-[1rem] border-transparent border-b-white' />
      <PopUpItem path={`/lists/new?id=${theme.id}`}>
        <>
          <FontAwesomeIcon icon={faPen} className='p-1' size='3x' />
          このお題でつくる
        </>
      </PopUpItem>
      <PopUpItem path={`/themes/${theme.id}`}>
        <>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='p-1' size='3x' />
          投稿を見る
        </>
      </PopUpItem>
    </div>
  </div>
)

const PopularThemes = ({ themes }: Props) => {
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [colors, setColors] = useState<Array<string>>([])

  useEffect(() => {
    const colorArray = [...Array(themes.length)].fill(null).map((_, i) => {
      return arrayRandom(backGroundColors) as string
    })
    setColors(colorArray)
  }, [themes.length])

  const handleMouseEnter = (themeId: number) => {
    selected === themeId ? setSelected(undefined) : setSelected(themeId)
  }

  return (
    <div className='flex px-3 md:px-10 flex-row flex-wrap justify-center gap-3'>
      {themes.map((theme, i) => (
        <ThemeCard key={'theme-card-' + theme.id} theme={theme} selected={selected} onMouseEnter={() => handleMouseEnter(theme.id)} color={colors[i]} />
      ))}
    </div>
  )
}

export default PopularThemes
