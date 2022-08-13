import { Movie } from 'interfaces/interface'

interface Props {
  children: React.ReactElement
  themeTitle: string
  movies: Array<Movie>
}

const TweetWrapper = ({ children, movies, themeTitle }: Props) => (
  <a
    href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_APP_HOST}/lists/${movies[0].listId}&text=${movies
      .map((m) => `${m.position + 1}.%20${m.title}%0a`)
      .join('')}&hashtags=${themeTitle}`}
    target='_blank'
    rel='noreferrer'
  >
    {children}
  </a>
)

export default TweetWrapper
