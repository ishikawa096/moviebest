import Image from 'next/image'

const Footer = () => (
  <footer className='font-base'>
    <div className='bg-gray-600 py-5 px-10 md:px-40 text-center text-gray-300 text-xs'>
      <Image src='/tmdbLogo.svg' width={100} height={64} alt='TMDB logo' objectFit='contain' />
      <p>このウェブサイトはTMDB APIを使用していますが、TMDBによって承認または認定されていません。This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </div>
  </footer>
)

export default Footer
