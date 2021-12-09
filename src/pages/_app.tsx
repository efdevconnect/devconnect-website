import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import SEO from 'common/components/SEO'

// Safari 100vh works poorly - this is the workaround
if (typeof window !== 'undefined') {
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--viewport-height', `${window.innerHeight}px`)
  }

  // window.addEventListener('resize', appHeight) // this causes jank on ios
  window.addEventListener('orientationchange', appHeight)

  appHeight()
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
