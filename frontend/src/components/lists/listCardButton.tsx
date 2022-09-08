import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Movie } from 'interfaces/interface'
import TweetWrapper from 'components/commons/tweetWrapper'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  title: string
  style: ButtonStyle
  tweetProps?: {
    themeTitle: string
    movies: Array<Movie>
  }
}
const styles = ['tweet', 'edit', 'delete']
type ButtonStyle = typeof styles[number]

const contentOfStyle = (style: ButtonStyle) => {
  switch (style) {
    case 'tweet':
      return <FontAwesomeIcon icon={faTwitter} />
    case 'edit':
      return <FontAwesomeIcon icon={faPen} />
    case 'delete':
      return <FontAwesomeIcon icon={faTrashCan} />
  }
}

const baseClass = 'text-lg z-20 my-0.5 py-0.5 px-2 hover:bg-white hover:bg-opacity-30 rounded-lg duration-150 ease-in-out'

const ListCardButton = ({ onClick, title, style, tweetProps }: Props) => {
  const button = (
    <button onClick={onClick} title={title} className={`${baseClass}`}>
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

export default ListCardButton
