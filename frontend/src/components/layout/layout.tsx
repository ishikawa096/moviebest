import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

interface CommonLayoutProps {
  children: React.ReactElement
}

export default function Layout({ children }: CommonLayoutProps) {
  return (
    <>
      <Header />
      <main>
        <div className='min-h-screen flex flex-col font-base bg-gray-100 pb-32'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
