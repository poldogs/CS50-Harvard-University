import './globals.css'
import { Montserrat } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

const montserrat = Montserrat({ subsets: ['latin'], weights: [400, 600, 700]  })

export const metadata = {
  title: 'CS50 Final Project',
  description: 'A CRUD app for managing tasks with some additional features. By @poldogs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="max-w-4xl mx-auto px-5">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
