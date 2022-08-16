import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import TweetWrapper from './tweetWrapper'
import { Movie } from 'interfaces/interface'

interface Props {
  themeTitle: string
  movies: Array<Movie>
}

const TweetButton = ({ themeTitle, movies }: Props) => (
  <TweetWrapper themeTitle={themeTitle} movies={movies}>
    <div className='block w-32 text-center rounded-lg px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap bg-sky-400 hover:bg-sky-500'>
      <FontAwesomeIcon icon={faTwitter} className='pr-1' />
      tweet
    </div>
  </TweetWrapper>
)

export default TweetButton
