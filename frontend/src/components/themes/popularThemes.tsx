import { randomBackGroundColors } from 'components/layout/styles'
import { List, Theme } from 'interfaces/interface'
import { arrayRandom } from 'lib/helpers'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
}

const ThemeCard = ({ theme, selected, onClick, color }: { theme: Theme & { lists: Array<List> }; selected: any; onClick: any; color: string }) => (
  <div
    onClick={onClick}
    className={`${selected === theme.id ? 'text-yellow-400 bg-white' : color} ${
      theme.lists.length > 3 ? 'text-2xl md:text-4xl' : 'text-base md:text-2xl'
    } relative flex items-center font-medium px-3 py-1 hover:text-yellow-400 hover:bg-white hover:shadow-sm cursor-pointer rounded-md duration-150 ease-in-out`}
  >
    {theme.title}
    <span className='rounded-full text-sm md:text-xl'>／{theme.lists.length}</span>

    <div
      className={`${
        selected === theme.id ? 'block' : 'hidden'
      } absolute top-10 min-w-[10rem] md:min-w-[12rem] flex flex-col bg-white text-center text-base md:text-lg text-sky-600 rounded-lg border z-10 motion-safe:animate-zoomIn`}
    >
      <Link href={`/lists/new?id=${theme.id}`}>
        <a className='block hover:text-sky-500 hover:bg-sky-100 p-2 cursor-pointer border-b'>このお題でつくる</a>
      </Link>
      <Link href={`/themes/${theme.id}`}>
        <a className='block hover:text-sky-500 hover:bg-sky-100 p-2 cursor-pointer'>投稿を見る</a>
      </Link>
    </div>
  </div>
)

const PopularThemes = ({ themes }: Props) => {
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [colors, setColors] = useState<Array<string>>([])

  useEffect(() => {
    const colorArray = [...Array(themes.length)].fill(null).map((_, i) => {
      return arrayRandom(randomBackGroundColors) as string
    })
    setColors(colorArray)
  }, [])

  return (
    <div className='flex px-3 md:px-10 flex-row flex-wrap justify-center gap-3'>
      {themes.map((theme, i) => (
        <ThemeCard key={'theme-card-' + theme.id} theme={theme} selected={selected} onClick={() => (selected === theme.id ? setSelected(undefined) : setSelected(theme.id))} color={colors[i]} />
      ))}
    </div>
  )
}

export default PopularThemes
