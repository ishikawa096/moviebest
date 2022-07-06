import Header from './header'
import Footer from './footer'

interface CommonLayoutProps {
  children: React.ReactElement
}

export default function Layout({ children }: CommonLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
