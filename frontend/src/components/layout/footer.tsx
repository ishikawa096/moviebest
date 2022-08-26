import Image from 'next/image'

const Footer = () => (
  <footer className='font-base'>
    <div className='bg-gray-600 py-5 px-10 md:px-40 text-center text-gray-300 text-xs'>
      <p>© 2022 EIGA NANDEMO BEST All Rights Reserved.</p>
      <a href='https://www.themoviedb.org' target='_blank' rel='noreferrer'>
        <Image src='/assets/images/tmdbLogo.svg' width={100} height={64} alt='TMDBロゴ' objectFit='contain' />
      </a>
      <p>このウェブサイトはTMDB APIを使用していますが、TMDBによって承認または認定されていません。This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </div>
  </footer>
)

export default Footer
