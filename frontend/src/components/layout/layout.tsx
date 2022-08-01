import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

interface CommonLayoutProps {
  children: React.ReactElement
}

export default function Layout({ children }: CommonLayoutProps) {
  return (
    <>
      <Header />
      <main className='px-3 lg:px-8'>
        <div className='py-16 min-h-screen flex flex-col justify-center items-center'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
