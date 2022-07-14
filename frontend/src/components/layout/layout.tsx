import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

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
