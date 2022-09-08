import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import TweetWrapper from './tweetWrapper'
import { Movie } from 'interfaces/interface'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  style: ButtonStyle
  tweetProps?: {
    themeTitle: string
    movies: Array<Movie>
  }
}
const styles = ['tweet', 'edit', 'delete']
type ButtonStyle = typeof styles[number]

const ListPageButton = ({ onClick, style, tweetProps }: Props) => {
  const baseClass = 'block w-32 text-center rounded-lg px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap'

  const classOfStyle = (style: ButtonStyle) => {
    switch (style) {
      case 'tweet':
        return 'text-white bg-sky-400 hover:bg-sky-500'

      case 'edit':
        return 'text-sky-400 bg-white hover:bg-gray-200 border-2'

      case 'delete':
        return 'text-red-400 bg-white hover:bg-gray-200 border-2'
    }
  }

  const contentOfStyle = (style: ButtonStyle) => {
    switch (style) {
      case 'tweet':
        return (
          <>
            <FontAwesomeIcon icon={faTwitter} className='pr-1' />
            tweet
          </>
        )
      case 'edit':
        return (
          <>
            <FontAwesomeIcon icon={faPen} className='pr-1' />
            edit
          </>
        )
      case 'delete':
        return (
          <>
            <FontAwesomeIcon icon={faTrashCan} className='pr-1' />
            delete
          </>
        )
    }
  }

  const button = (
    <button onClick={onClick} className={`${classOfStyle(style)} ${baseClass}`}>
      {contentOfStyle(style)}
    </button>
  )

  return (
    <>
      {style === 'tweet' && tweetProps ? (
        <TweetWrapper themeTitle={tweetProps.themeTitle} movies={tweetProps.movies}>
          {button}
        </TweetWrapper>
      ) : (
        button
      )}
    </>
  )
}

export default ListPageButton
