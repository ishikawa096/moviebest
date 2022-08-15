import Image from 'next/image'

const About = () => (
  <div className='relative py-5 px-10 md:px-28 lg:px-40 w-screen flex flex-col text-center items-center text-gray-600 bg-gradient-to-br from-cyan-400 via-sky-300 to-cyan-300'>
    <h3 className='mb-10 text-3xl md:text-5xl font-bold text-white'>映画なんでもベストとは？</h3>
    <p className='mb-3 text-lg'>自由なお題で映画ベストランキングを作って公開できるサービスです。</p>
    <p className='mb-10 text-sm'>＊ お題やベストを作るにはログインが必要です。</p>
    <h3 className='mb-5 text-3xl md:text-5xl font-bold text-white'>使い方</h3>
    <div className='p-8 mb-10 bg-white w-full flex-col flex items-center gap-3 rounded-lg'>
      <div className='rounded-lg overflow-hidden shadow-md w-[fit-content] bg-gray-100'>
        <Image src='/screen.png' width={400} height={300} alt='作成画面' objectFit='contain' />
      </div>
      <div>投稿ボタンからベストを作成。お題を選んで映画を入力</div>
    </div>
    <div className='p-8 mb-10 bg-white w-full flex-col flex gap-3 rounded-lg'>
      <div className='rounded-lg overflow-hidden'>
        <Image src='/undraw_social_friends_re_7uaa.svg' width={400} height={300} alt='作成画面' objectFit='contain' />
      </div>
      <div>作ったベストはツイートボタンでシェアできます<br />「マイベスト」から編集も可能</div>
    </div>
    <div className='p-8 mb-10 bg-white w-full flex-col flex gap-3 rounded-lg'>
      <div className='rounded-lg overflow-hidden'>
        <Image src='/undraw_lightbulb_moment_re_ulyo_y.svg' width={400} height={300} alt='作成画面' objectFit='contain' />
      </div>
      <div>新しいお題を作って、自分好みの映画ベストを投稿しよう</div>
    </div>
  </div>
)

export default About
