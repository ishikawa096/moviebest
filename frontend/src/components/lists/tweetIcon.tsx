import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Movie } from 'interfaces/interface'
import TweetWrapper from 'components/commons/tweetWrapper'

interface Props {
  themeTitle: string
  movies: Array<Movie>
}

const TweetIcon = ({ themeTitle, movies }: Props) => (
  <div className='text-xl pr-2 pt-1 z-20 hover:text-gray-300 hover:-translate-y-1 hover:scale-110 duration-150 ease-in-out'>
    <TweetWrapper themeTitle={themeTitle} movies={movies}>
      <div><FontAwesomeIcon icon={faTwitter} /></div>
    </TweetWrapper>
  </div>
)

export default TweetIcon
