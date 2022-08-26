import Image from 'next/image'

const BG_IMAGE = '/assets/images/Kander.svg'

const SignInLayout = ({ children, title }: { children: React.ReactElement; title: string }) => (
  <div className='relative text-gray-700 bg-white h-full text-[0px]'>
    <Image src={BG_IMAGE} alt='背景画像' priority={true} width={1600} height={1200} objectFit='cover' />
    <div className='px-3 sm:px-7 justify-center text-base text-center items-center bg-white absolute top-1/4 right-10 left-10 sm:w-4/3 sm:right-1/4 sm:left-1/4 z-10 rounded-xl shadow-md'>
      <h3 className='text-2xl pt-5 pb-3 font-light'>{title}</h3>
      {children}
    </div>
  </div>
)

export default SignInLayout
