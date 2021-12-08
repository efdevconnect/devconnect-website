import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import css from './index.module.scss'
import dynamic from 'next/dynamic'
import React from 'react'
import TwitterIcon from 'assets/icons/twitter.svg'
import MouseIcon from 'assets/icons/mouse.svg'
import HeaderLogo from 'assets/images/header-logo.png'
import Logo from 'assets/images/logo.png'
import FingersCrossed from 'assets/images/fingers-crossed.png'
import Amsterdam from 'assets/images/amsterdam.png'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'
import HorizontalLooper from 'common/components/horizontal-looper'

const Cube = dynamic(() => import('common/components/cube'), {
  ssr: false,
})

const Header = () => {
  return (
    <header className={`${css['header']} section-clear-vertical`}>
      <div className={css['logo']}>
        <Image src={HeaderLogo} alt="Devonnect Header Logo" />
      </div>

      <div className={css['menu']}>
        <AnchorLink href="#about">About</AnchorLink>
        <AnchorLink href="#amsterdam">Amsterdam</AnchorLink>
        <AnchorLink href="#get-involved">Get Involved</AnchorLink>
        <TwitterIcon style={{ fill: 'white' }} />
      </div>
    </header>
  )
}

// const useScrollY = () => {
//   const [y, setY] = React.useState(false)

//   React.useEffect(() => {
//     const handleScroll = () => {
//       setY(window.scrollY)
//     }

//     window.addEventListener('scroll', handleScroll)

//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return y
// }

const Scene = (props: any) => {
  let className = css['scene']

  // const scrollY = useScrollY()

  if (props.className) className += ` ${props.className}`

  // console.log(scrollY, 'scroll y')

  return (
    <>
      <div id={props.id} className={className} /*style={{ '--scroll-y': `${scrollY}px` }}*/>
        {props.children}
      </div>
    </>
  )
}

const Home: NextPage = () => {
  const [dateHovered, setDateHovered] = React.useState(false)

  return (
    <div className={css.container}>
      <Head>
        <title>Devconnect</title>
        <meta name="description" content="Devconnect landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={css.main}>
        <Scene className={css['scene-1']}>
          <Header />

          <div className={css['cube-container']}>
            {/* Cube logic is loaded asynchronously and its scripts need the element to exist at initiation, so we add a div to instantiate on: */}
            <div className={css['cube']} id="cube" />
            <Cube />
          </div>

          <div className={`${css['info']} section`}>
            <div
              className={css['date-container']}
              onMouseEnter={() => setDateHovered(true)}
              onMouseLeave={() => setDateHovered(false)}
            >
              <p className={`${css['date']} subheader`}>April 2022</p>
              {dateHovered && <Image src={FingersCrossed} alt="Fingers crossed" />}
            </div>

            <p className={`${css['place']} subheader`}>Amsterdam, Netherlands</p>

            <p className={css['description']}>
              <span>A collaborative</span> <b>Ethereum</b> <span>week, built by and for</span>{' '}
              <b className={css['red-underline']}>everyone.</b>
            </p>
          </div>

          <div className={`section-clear-vertical ${css['bottom']}`}>
            <Image src={Logo} alt="Devconnect logo" />

            <div className={css['scroll-for-more']}>
              <p>Scroll to learn more</p>
              <MouseIcon />
            </div>
          </div>
        </Scene>

        <Scene id="about" className={`${css['scene-2']} section-clear-vertical`}>
          <h1 className="section-header">About</h1>
          <div className={css['text-container']}>
            <p className={`${css['about-text']} subheader`}>DEVCONNECT - [ DeV-kuUUUh-nEEeKKt ]</p>
            <p className="massive-header">DEV/CONNECT</p>
          </div>
          <button className="button">Get Involved</button>
        </Scene>

        <Scene id="amsterdam" className={`${css['scene-3']} section-clear-vertical`}>
          <h1 className="section-header grey">
            Amsterdam <br /> Netherlands
          </h1>

          <div className={css['content']}>
            <div className={css['description-container']}>
              <div className={css['background-header']}>
                <HorizontalLooper>
                  <p className={`massive-header`}>Amsterdam</p>
                </HorizontalLooper>
              </div>
              <p className={`${css['about-text']} subheader`}>AMSTERDAM - [ ahm-stuhr-dahYUMMMm ]</p>
              <p className="section-header">Amsterdam is known as one of the world’s most multicultural cities.</p>
              <p className="section-header">
                Like Ethereum, it can mean many things to many different people, and there’s something interesting for
                everyone. So where better to give a distributed (and passionate) ecosystem a more connected feel than in
                a city brought together by canals 🛶, bike lanes 🚲, and culture 🏫 throughout?
              </p>
            </div>
            <div className={css['image']}>
              <Image src={Amsterdam} alt="Amsterdam" layout="fill" />
            </div>
          </div>
        </Scene>
        <Scene id="get-involved" className={`${css['scene-4']} section-clear-vertical`}>
          <h1 className="section-header grey">Get Involved</h1>
        </Scene>
      </main>
    </div>
  )
}

export default Home
