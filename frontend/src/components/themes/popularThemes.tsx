import { List, Theme } from 'interfaces/interface'
import { randomColor } from 'lib/helpers'
import Link from 'next/link'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
}

const ThemeCard = ({ theme }: { theme: Theme & { lists: Array<List> } }) => (
  <div className={`h-auto items-baseline font-bold bg-orange-300 ${theme.lists.length > 1 ? 'text-4xl' : 'text-2xl'} ${randomColor()}`}>
    <Link href={`/themes/${theme.id}`}>
      <a>
        {theme.title} ({theme.lists.length})
      </a>
    </Link>
  </div>
)

const PopularThemes = ({ themes }: Props) => {
  return (
    <>
      <div className='flex px-10 flex-row flex-wrap justify-center gap-3'>
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </>
  )
}

export default PopularThemes
