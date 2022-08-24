import Image from 'next/image'

const CREATE_LIST_IMAGE = '/asset/image/createList.gif'
const CREATE_LIST_IMAGE2 = '/asset/image/undraw_appreciation_vmef.svg'
const SHARE_IMAGE = '/asset/image/tweet.png'
const SHARE_IMAGE2 = '/asset/image/undraw_winners_re_wr1l.svg'
const CREATE_THEME_IMAGE = '/asset/image/createTheme.gif'
const CREATE_THEME_IMAGE2 = '/asset/image/undraw_lightbulb_moment_re_ulyo_y.svg'

const About = () => (
  <div className='relative py-5 px-10 md:px-28 lg:px-40 w-screen flex flex-col text-center items-center text-gray-600 bg-gradient-to-br from-cyan-400 via-sky-300 to-cyan-300'>
    <h3 className='mb-10 text-3xl md:text-5xl font-bold text-white'>映画なんでもベストとは？</h3>
    <p className='mb-3 text-lg'>自由なお題で映画ベストランキングを作って公開できるサービスです。</p>
    <p className='mb-10 text-sm'>＊ お題やベストを作るにはログインが必要です。</p>
    <h3 className='mb-5 text-3xl md:text-5xl font-bold text-white'>使い方</h3>
    <div className='relative p-1 mb-10 bg-white w-full flex-col flex items-center gap-3 rounded-lg'>
      <div className='text-sm md:text-base md:text-base bg-white z-10 underline decoration-yellow-400 underline-offset-4 decoration-2 decoration-wavy'>
        投稿ボタンから作成。 お題を選んで映画を入力
      </div>
      <div className='rounded-lg overflow-hidden shadow-md w-[fit-content] bg-gray-100'>
        <Image src={CREATE_LIST_IMAGE} width={842} height={500} alt='ベスト作成画面' objectFit='contain' />
      </div>
      <div className='pb-2 text-sm md:text-base text-sm md:text-base underline decoration-blue-400 underline-offset-4 decoration-2 decoration-wavy'>作成後「マイベスト」から編集も可能</div>
      <div className='hidden md:block absolute bottom-0 right-0'>
        <Image src={CREATE_LIST_IMAGE2} width={200} height={200} alt='楽しむ人' objectFit='contain' />
      </div>
    </div>
    <div className='relative p-1 mb-10 bg-white w-full flex-col flex items-center gap-3 rounded-lg'>
      <div className='rounded-lg overflow-hidden shadow-md w-[fit-content] bg-gray-100'>
        <Image src={SHARE_IMAGE} width={842} height={405} alt='ツイートのイメージ' objectFit='contain' />
      </div>
      <div className='pb-2 bg-white bottom-0 text-sm md:text-base underline decoration-yellow-400 underline-offset-4 decoration-2 decoration-wavy'>ツイートボタンで簡単シェア</div>
      <div className='hidden md:block absolute bottom-0 left-0'>
        <Image src={SHARE_IMAGE2} width={200} height={200} alt='喜ぶ人たち' objectFit='contain' />
      </div>
    </div>
    <div className='relative p-1 mb-10 bg-white w-full flex-col flex items-center gap-3 rounded-lg'>
      <div className='rounded-lg overflow-hidden shadow-md w-[fit-content] bg-gray-100'>
        <Image src={CREATE_THEME_IMAGE} width={842} height={500} alt='お題作成のイメージ' objectFit='contain' />
      </div>
      <div className='pb-2 text-sm md:text-base underline decoration-orange-400 underline-offset-4 decoration-2 decoration-wavy'>新しいお題を作って、 自分好みの映画ベストを投稿しよう</div>
      <div className='hidden md:block absolute right-0'>
        <Image src={CREATE_THEME_IMAGE2} width={200} height={200} alt='思いついている人' objectFit='contain' />
      </div>
    </div>
  </div>
)

export default About
