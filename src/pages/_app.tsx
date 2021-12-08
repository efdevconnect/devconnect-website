import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import SEO from 'common/components/SEO'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      {!process.env.devMode && (
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://matomo.ethereum.org/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '29']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();`,
            }}
          />
        </Head>
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
