import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const CREATE_LIST_IMAGE = '/assets/images/createList.gif'
const CREATE_LIST_IMAGE2 = '/assets/images/undraw_appreciation_vmef.svg'
const SHARE_IMAGE = '/assets/images/tweet.webp'
const SHARE_IMAGE2 = '/assets/images/undraw_winners_re_wr1l.svg'
const CREATE_THEME_IMAGE = '/assets/images/createTheme.gif'
const CREATE_THEME_IMAGE2 = '/assets/images/undraw_lightbulb_moment_re_ulyo_y.svg'

const TopicContainer = ({ children }: { children: React.ReactElement }) => <div className='relative p-1 mb-10 bg-white w-full flex-col flex items-center gap-3 rounded-lg'>{children}</div>

const MainImageOuter = ({ children }: { children: React.ReactElement }) => <div className='rounded-lg overflow-hidden shadow-md w-[fit-content] bg-gray-100'>{children}</div>

const headerStyles = 'mb-5 text-3xl md:text-5xl font-bold text-white'
const captionStyles = 'text-sm md:text-base underline underline-offset-4 decoration-2 decoration-wavy '
const miniImageStyles = 'hidden md:block absolute '

const About = () => (
  <div className='relative py-5 px-10 md:px-28 lg:px-40 w-screen flex flex-col text-center items-center text-gray-600 bg-gradient-to-br from-cyan-400 via-sky-300 to-cyan-300'>
    <h3 className={headerStyles}>映画なんでもベストとは？</h3>
    <p className='mb-3 text-lg'>自由なお題で映画ベストランキングを作って公開できるサービスです。</p>
    <p className='mb-10 text-sm'>
      <FontAwesomeIcon icon={faTriangleExclamation} className='px-1' />
      お題やベストを作るにはログインが必要です。
    </p>
    <h3 className={headerStyles}>使い方</h3>
    <TopicContainer>
      <>
        <div className={captionStyles + 'decoration-yellow-400'}>投稿ボタンから作成。 お題を選んで映画を入力</div>
        <MainImageOuter>
          <Image src={CREATE_LIST_IMAGE} width={842} height={500} alt='ベスト作成画面' objectFit='contain' />
        </MainImageOuter>
        <p className={captionStyles + 'pb-2 decoration-blue-400'}>作成後の編集も可能</p>
        <div className={miniImageStyles + 'bottom-0 right-0'}>
          <Image src={CREATE_LIST_IMAGE2} width={200} height={200} alt='楽しむ人' objectFit='contain' />
        </div>
      </>
    </TopicContainer>
    <TopicContainer>
      <>
        <MainImageOuter>
          <Image src={SHARE_IMAGE} width={842} height={405} alt='ツイートのイメージ' objectFit='contain' />
        </MainImageOuter>
        <p className={captionStyles + 'pb-2 decoration-yellow-400'}>ツイートボタンで簡単シェア</p>
        <div className={miniImageStyles + 'bottom-0 left-0'}>
          <Image src={SHARE_IMAGE2} width={200} height={200} alt='喜ぶ人たち' objectFit='contain' />
        </div>
      </>
    </TopicContainer>
    <TopicContainer>
      <>
        <MainImageOuter>
          <Image src={CREATE_THEME_IMAGE} width={842} height={500} alt='お題作成のイメージ' objectFit='contain' />
        </MainImageOuter>
        <p className={captionStyles + 'pb-2 decoration-orange-400'}>新しいお題を作って、 自分好みの映画ベストを投稿しよう</p>
        <div className={miniImageStyles + 'right-0'}>
          <Image src={CREATE_THEME_IMAGE2} width={200} height={200} alt='思いついている人' objectFit='contain' />
        </div>
      </>
    </TopicContainer>
  </div>
)

export default About
