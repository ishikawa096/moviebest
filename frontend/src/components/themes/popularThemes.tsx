import { randomBackGroundColors } from 'components/layout/styles'
import { List, Theme } from 'interfaces/interface'
import { arrayRandom } from 'lib/helpers'
import Link from 'next/link'

interface Props {
  themes: Array<Theme & { lists: Array<List> }>
}

const ThemeCard = ({ theme }: { theme: Theme & { lists: Array<List> } }) => (
  <div
    className={`flex items-center h-auto px-3 py-1 hover:text-yellow-400 hover:bg-white hover:shadow-sm rounded-md duration-150 ease-in-out ${theme.lists.length > 3 ? 'text-4xl' : 'text-2xl'} ${arrayRandom(
      randomBackGroundColors
    )}`}
  >
    <Link href={`/themes/${theme.id}`}>
      <a className='font-bold'>
        {theme.title}
        <span className='rounded-full text-xl'>／{theme.lists.length}</span>
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
