import Image from 'next/image'

const Footer = () => (
  <footer>
    <div>
      <Image src='/tmdbLogo.svg' width={100} height={64} alt='TMDB logo' objectFit='contain' />
      <p>このウェブサイトはTMDB APIを使用していますが、TMDBによって承認または認定されていません。This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </div>
  </footer>
)

export default Footer
