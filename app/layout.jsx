import '@styles/globals.css'

import Provider from '@components/Provider'
import Navbar from '@components/Navbar'

export const metadata = {
	title: 'Promptopia',
	descripton: 'Promptopia is a place to find and share AI prompts.',
}

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout