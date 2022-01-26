import 'styles/globals.scss'
import type { AppProps } from 'next/app'

// Safari 100vh works poorly - this is the workaround
if (typeof window !== 'undefined') {
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--viewport-height', `${window.innerHeight}px`)
  }

  window.addEventListener('resize', appHeight)
  window.addEventListener('orientationchange', appHeight)

  appHeight()
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
