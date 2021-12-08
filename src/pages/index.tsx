import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import css from './index.module.scss'
import dynamic from 'next/dynamic'
import React from 'react'
import TwitterIcon from 'assets/icons/twitter.svg'
import ArrowUpIcon from 'assets/icons/arrow-up.svg'
import HeaderLogo from 'assets/images/header-logo.svg'
import Logo from 'assets/images/logo.svg'
import FingersCrossed from 'assets/images/fingers-crossed.png'
import Amsterdam from 'assets/images/amsterdam.png'
import DevconnectAmsterdamText from 'assets/images/amsterdam-logo-text.png'
import DevconnectAmsterdam from 'assets/images/amsterdam-logo.png'
import RoadToDevcon from 'assets/images/road-to-devcon.png'
import HorizontalLooper from 'common/components/horizontal-looper'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Cube = dynamic(() => import('common/components/cube'), {
  ssr: false,
})

const Header = () => {
  return (
    <header className={`${css['header']} section-clear-vertical`}>
      <div className={css['logo']}>
        <HeaderLogo />
        {/* <Image src={HeaderLogo} alt="Devonnect Header Logo" /> */}
      </div>

      <div className={css['menu']}>
        <AnchorLink href="#about">About</AnchorLink>
        <AnchorLink href="#amsterdam">Amsterdam</AnchorLink>

        <a target="_blank" rel="noreferrer" href="https://forms.gle/m5KWJ3aX5H3kTR7s6">
          Get Involved
        </a>

        <a className={css['twitter']} target="_blank" rel="noreferrer" href="https://twitter.com/efdevconnect">
          <TwitterIcon style={{ fill: 'white' }} />
        </a>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <div className={`${css['footer']} section-clear-vertical`}>
      <Logo className={css['background']} viewBox="0 0 65 65" />

      <div className={css['top']}>
        <Image src={DevconnectAmsterdam} alt="Devconnect amsterdam" />
        <Image src={DevconnectAmsterdamText} alt="Devconnect amsterdam text" />
      </div>

      <div className={css['middle']}>
        <div className={css['left']}>
          <div className={css['road-to-devcon']}>
            <p className={css['title']}>A road to devcon event</p>
            <Image src={RoadToDevcon} alt="Road to devcon: man and dog" />
          </div>
          <p>Brought to you by the Ethereum Foundation</p>
        </div>

        <div className={css['menu']}>
          <AnchorLink href="#main">
            Back to top <ArrowUpIcon />
          </AnchorLink>

          <AnchorLink href="#about">About</AnchorLink>

          <AnchorLink href="#amsterdam">Amsterdam</AnchorLink>

          <a target="_blank" rel="noreferrer" href="https://forms.gle/m5KWJ3aX5H3kTR7s6">
            Get Involved
          </a>

          <a target="_blank" rel="noreferrer" href="https://twitter.com/efdevconnect">
            <TwitterIcon style={{ fill: 'white' }} />
          </a>
        </div>
      </div>

      <div className={css['bottom']}>
        <div className={css['crafted-by']}>
          <p>Crafted and curated with passion ♥ ✨ at the Ethereum Foundation.</p>
          <p className={css['copyright']}>© 2021 — Ethereum Foundation. All Rights Reserved.</p>
        </div>

        <div className={css['links']}>
          <a target="_blank" rel="noreferrer" href="https://devcon.org">
            Devcon
          </a>
          <a target="_blank" rel="noreferrer" href="mailto:support@devcon.org">
            Contact Us
          </a>
          <a target="_blank" rel="noreferrer" href="https://ethereum.foundation">
            Ethereum Foundation
          </a>
        </div>
      </div>
    </div>
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
  if (props.growVertically) className += ` ${css['grow-vertically']}`

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

      <main id="main" className={css.main}>
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
            <Logo />
            {/* <Image src={Logo} alt="Devconnect logo" /> */}

            <div className={css['scroll-for-more']}>
              <p>Scroll to learn more</p>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16">
                <g className="nc-icon-wrapper" fill="#ffffff">
                  <g className={`${css['nc-loop-mouse-16-icon-f']}`}>
                    <path
                      d="M10,0H6A4.012,4.012,0,0,0,2,4v8a4.012,4.012,0,0,0,4,4h4a4.012,4.012,0,0,0,4-4V4A4.012,4.012,0,0,0,10,0Zm2,12a2.006,2.006,0,0,1-2,2H6a2.006,2.006,0,0,1-2-2V4A2.006,2.006,0,0,1,6,2h4a2.006,2.006,0,0,1,2,2Z"
                      fill="#ffffff"
                    ></path>
                    <path
                      d="M8,4A.945.945,0,0,0,7,5V7A.945.945,0,0,0,8,8,.945.945,0,0,0,9,7V5A.945.945,0,0,0,8,4Z"
                      fill="#ffffff"
                      data-color="color-2"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </Scene>

        <Scene growVertically id="about" className={`${css['scene-2']} section-clear-vertical`}>
          <h1 className="section-header">About</h1>

          <div className={css['text-container']}>
            <p className={`${css['about-text']} subheader`}>DEVCONNECT - [ DeV-kuUUUh-nEEeKKt ]</p>
            {/* <p className="massive-header">DEV/CONNECT</p> */}

            <p className="section-header">
              Devconnect is a week-long and in-person gathering that will feature independent Ethereum events, each with
              a unique focus. The goal is to focus on depth-first gatherings rather than size, and to bring the Ethereum
              community together in smaller groups to talk (and learn) about, or to make sincere progress on, specific
              subjects.
            </p>

            <p className="subheader">
              Events at and around Devconnect will be hosted and curated by experts in those domains. As for everyone
              coming to town and wanting to hang out and work together between events, we&apos;ll maintain a space for
              collaboration for all who are interested.
            </p>

            <a
              href="https://blog.ethereum.org/2021/11/03/devcon-archive-v2/"
              target="_blank"
              rel="noreferrer"
              className={`subheader ${css['read-blog']}`}
            >
              READ BLOG POST (TO-DO: UPDATE URL)
            </a>
          </div>

          <div className={css['topics-container']}>
            <p className="subheader">Topics Include</p>
            <HorizontalLooper slow>
              <p className="section-header">
                zkEVM • metaverse • STAKING • CONSENSUS LAYER • Web3 UX NFTS • solidity • governance • developer
                infrastructure • Execution Layer • Web2 &gt; Web3 dev • ETHconomics • Rollups • MEV • Security •
                Sustainability • Advocacy • VDFs • Hackathon • Workshops
              </p>
            </HorizontalLooper>
          </div>

          <a
            href="https://forms.gle/m5KWJ3aX5H3kTR7s6"
            target="_blank"
            rel="noreferrer"
            className={`button ${css['get-involved-button']}`}
          >
            Get Involved
          </a>
        </Scene>

        <Scene growVertically id="amsterdam" className={`${css['scene-3']} section-clear-vertical`}>
          <h1 className="section-header grey">
            Amsterdam <br /> Netherlands
          </h1>

          <div className={css['content']}>
            <div className={css['text-container']}>
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
              <Image src={Amsterdam} objectFit="cover" layout="fill" alt="Amsterdam" />
            </div>
          </div>
        </Scene>
      </main>

      <Footer />
    </div>
  )
}

export default Home
