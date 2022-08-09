import type { NextPage } from 'next'
import Image from 'next/image'
import css from './index.module.scss'
import dynamic from 'next/dynamic'
import React from 'react'
import HeaderLogo from 'assets/images/header-logo.svg'
import Logo from 'assets/images/logo.svg'
import LogoBig from 'assets/images/logo-big.svg'
import FingersCrossed from 'assets/images/fingers-crossed.png'
import DevconnectAmsterdamText from 'assets/images/amsterdam-logo-text.svg'
import DevconnectAmsterdam from 'assets/images/amsterdam-logo-with-eth.svg'
import RoadToDevcon from 'assets/images/rtd.png'
import HorizontalLooper from 'common/components/horizontal-looper'
import CubeImages from 'assets/images/cube-images.png'
import BluePrint from 'assets/images/blueprint-bg.png'
import VideoPlaceholder from 'assets/images/devconnect-video-placeholder.png'
import { SEO } from 'common/components/SEO'
import { Menu, FooterMenu } from 'common/components/layout/Menu'
import Link from 'common/components/link/Link'
import Accordion, { AccordionItem } from 'common/components/accordion'
import Modal from 'common/components/modal'
import YoutubeIcon from 'assets/icons/youtube.svg'
import Cowork1 from 'assets/images/event-pictures/amsterdam-2022-event-picture-2.jpg'
import Cowork2 from 'assets/images/event-pictures/amsterdam-2022-event-picture-6.jpg'
import Cowork3 from 'assets/images/event-pictures/amsterdam-2022-event-picture-1.jpg'
import Cowork4 from 'assets/images/event-pictures/amsterdam-2022-event-picture-5.jpg'
import Cowork5 from 'assets/images/event-pictures/amsterdam-2022-event-picture-3.jpg'

const Cube = dynamic(() => import('common/components/cube'), {
  ssr: false,
})

const FAQ = [
  {
    text: 'Where can I find the devconnect streams?',
    value: 'streams',
    content: () => {
      return (
        <p>
          You can find content from most events on the{' '}
          <Link href="/schedule" indicateExternal>
            Devconnect schedule
          </Link>
          ,{' '}
          <Link href="https://streameth.tv" indicateExternal>
            StreamETH
          </Link>
          , and at each event’s website.
        </p>
      )
    },
  },
  {
    text: 'What is the difference between Devcon and Devconnect?',
    value: 'diff',
    content: () => {
      return (
        <p>
          While complementary, both Devcon and Devconnect are very different types of events.{' '}
          <Link href="https://devcon.org" indicateExternal>
            Devcon
          </Link>{' '}
          is the Ethereum Foundation&apos;s oldest and principal event where the Ethereum community gathers in one venue
          for several days of programming, collaboration, and reunion. Devconnect was an experimental event that we did
          for the first time this year (2022), the focus was on in-depth conversations, facilitated through independent,
          topic-specific events. It was spread throughout different venues around Amsterdam city, each with their own
          access control and ticketing.
        </p>
      )
    },
  },
  {
    text: 'Will there be a Devconnect next year?',
    value: 'next-year',
    content: () => {
      return (
        <p>
          To be determined! If you liked it, show us your love on Twitter{' '}
          <Link href="https://twitter.com/efdevconnect">@EFDevconnect</Link> ;)
        </p>
      )
    },
  },
  {
    text: 'Where will Devconnect take place next?',
    value: 'where-next',
    content: () => {
      return <p>To be determined! Welcoming ideas :)</p>
    },
  },
]

const CodeOfConduct = () => {
  return (
    <div className={css['code-of-conduct']}>
      <p className="large-text bold">Code of Conduct</p>
      <p className="big-text underline bold">TL;DR</p>
      <p>
        <b>Be excellent to each other</b>. If a participant is, in our sole discretion, harassing or otherwise
        unacceptably impacting other participants&apos; ability to enjoy Devconnect, we at all times reserve the right
        to remove the offending person(s) from the event without refund.
      </p>
      <p className="big-text underline bold">Don&apos;t Shill</p>
      <p>
        Devconnect is designed for builders and developers -{' '}
        <i>
          <b>
            We aim to create a welcoming, collaborative space which allows for great networking opportunities. Please
            respect this space and the opportunity it affords by not aggressively shilling ICOs, investment
            opportunities, or financial products.
          </b>
        </i>{' '}
        If unsure, please ask the staff.
      </p>
      <p className="big-text underline bold">Harassment Policy</p>
      <p>We do not condone any form of harassment against any participant, for any reason. </p>
      <p>
        {' '}
        Harassment includes, but is not limited to, any threatening, abusive, or insulting words, behavior, or
        communication (whether in person or online), whether relating to gender, sexual orientation, physical or mental
        ability, age, socioeconomic status, ethnicity, physical appearance, race, religion, sexual images, or otherwise.
        Harassment also includes hacking, deliberate intimidation, stalking, inappropriate physical contact, and
        unwelcome sexual attention.
      </p>
      <p>
        {' '}
        Participants asked to stop any harassing behavior must comply immediately. We reserve the right to respond to
        harassment in the manner we deem appropriate, including but not limited to expulsion without refund and referral
        to the relevant authorities.
      </p>
      <p>
        {' '}
        This Code of Conduct applies to everyone participating at Devconnect - from attendees and exhibitors to
        speakers, press, volunteers, etc.
      </p>
      <p>
        {' '}
        Anyone can report harassment. If you were or are being harassed, notice that someone else was or is being
        harassed, or have any other concerns related to harassment, you can contact a Devconnect volunteer or staff
        member, make a report at the registration desk or info booth, or submit a complaint to support@devcon.org.
      </p>
      <p className="big-text underline bold">Approved Swag Only</p>
      <p>
        <b>
          Only pre-approved teams are authorized to distribute swag (clothing, sales, freebies, or any form of
          promotional material) at Devconnect!
        </b>{' '}
        Examples of permitted groups include the Devconnect team, and some of the other pre-approved event organizers.
        Please respect this decision. If you are unsure of whether you are allowed to distribute your swag, ask the
        friendly staff!
      </p>
      <p className="big-text underline bold">Wifi Etiquette</p>
      <p>We want all attendees to be able to enjoy fast, reliable WiFi. As such, please keep the following in mind:</p>
      <ul>
        <li>
          <i>No ARP storms</i>
        </li>
        <li>
          <i>No Private WiFi access points</i>
        </li>
        <li>
          <i>No Private DHCP servers</i>
        </li>
      </ul>
      <p className="big-text underline bold">Media Policy</p>
      <p>
        At Devconnect we aim to respect the privacy of our attendees. It is important for you to review the Devconnect
        Media Policy and to ensure you understand and follow it.
      </p>{' '}
      <p className="big-text underline bold">Be Respectful to Speakers (and audiences)</p>
      <p>
        Be mindful of your volume when you&apos;re in or near event venues. Noise levels can quickly get out of control
        and become disruptive to the programme going on inside! Please respect the speakers and participants if you are
        arriving late to an event and/or getting up to leave an event early — try to cause as little disruption as
        possible.
      </p>
      <p className="big-text underline bold">Local Laws</p>
      <p>
        You must comply with all venue and facility rules and regulations during your participation in Devconnect,
        including all safety instructions and requirements. It is also very important to note that <b>ALL</b> attendees
        are expected to conform to <b>ALL</b> local laws, including Covid-19 restrictions and policies imposed by the
        venue, facility, and/or local authorities.
      </p>
      <p className="big-text underline bold">How to Report</p>
      <p>If you notice any violations of this Code of Conduct please report them to support@devcon.org.</p>
      <p className="big-text underline bold">Remember</p>
      <p className="bold">
        Devconnect is what you make of it, and as a community we can create a safe, meaningful, and incredible
        experience for everyone! 🦄
      </p>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="section">
      <header className={`${css['header']} clear-vertical`}>
        <Link href="/" className={css['logo']}>
          <HeaderLogo />
        </Link>

        <Menu />
      </header>
    </div>
  )
}

type FooterProps = {
  inFoldoutMenu?: boolean
}

export const Footer = ({ inFoldoutMenu }: FooterProps) => {
  const [codeOfConductModalOpen, setCodeOfConductModalOpen] = React.useState(false)
  let className = css['footer-container']

  if (inFoldoutMenu) className += ` ${css['in-foldout-menu']}`

  return (
    <>
      <Modal
        className={css['modal-overrides']}
        open={codeOfConductModalOpen}
        close={() => setCodeOfConductModalOpen(false)}
        noBodyScroll
      >
        <CodeOfConduct />
      </Modal>
      <div className={className}>
        <LogoBig className={css['background']} />

        <div className="section">
          <div className={`${css['footer']} clear-vertical`}>
            <div className={css['top']}>
              <DevconnectAmsterdam />
              <DevconnectAmsterdamText />
            </div>

            <div className={css['middle']}>
              <div className={css['left']}>
                <a target="_blank" rel="noreferrer" href="https://devcon.org" className={css['road-to-devcon']}>
                  <p className={`${css['title']} extra-large-text title`}>
                    A road to <br /> devcon event
                  </p>
                  <Image src={RoadToDevcon} alt="Road to devcon: man and dog" />
                </a>

                <p className={`${css['subtext']} dark-grey`}>Brought to you by the Ethereum Foundation</p>
                <p className={`${css['email']} medium-text`}>support@devcon.org</p>
              </div>

              <FooterMenu />
            </div>

            <div className={css['bottom']}>
              <div className={css['crafted-by']}>
                <p className="tiny-text">Crafted and curated with passion ♥ ✨ at the Ethereum Foundation.</p>
                <p className={`${css['copyright']} tiny-text`}>
                  © {new Date().getFullYear()} — Ethereum Foundation. All Rights Reserved.
                </p>
              </div>

              <div className={css['links']}>
                <Link href="https://devcon.org">Devcon</Link>
                <Link href="mailto:support@devcon.org">Contact Us</Link>
                <Link href="https://ethereum.foundation">Ethereum Foundation</Link>

                <a
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setCodeOfConductModalOpen(!codeOfConductModalOpen)
                    }
                  }}
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault()

                    setCodeOfConductModalOpen(!codeOfConductModalOpen)
                  }}
                >
                  Code of Conduct
                </a>

                <Link href="https://ethereum.org/en/privacy-policy/">Privacy policy</Link>
                <Link href="https://ethereum.org/en/terms-of-use/">Terms of use</Link>
                <Link href="https://ethereum.org/en/cookie-policy/">Cookie policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Scene = (props: any) => {
  let className = css['scene']

  if (props.className) className += ` ${props.className}`
  if (props.growVertically) className += ` ${css['grow-vertically']}`
  if (props.growNaturally) className += ` ${css['grow-naturally']}`

  return (
    <>
      <div id={props.id} className={className}>
        {props.children}
      </div>
    </>
  )
}

const Home: NextPage = (props: any) => {
  const [dateHovered, setDateHovered] = React.useState(false)

  return (
    <>
      <SEO />
      <div className={css.container}>
        <main id="main" className={css.main}>
          <Scene className={css['scene-hero']}>
            <Header />

            <div className={css['cube-container']}>
              {/* Cube logic is loaded asynchronously and its scripts need the element to exist at initiation, so we add a div to instantiate on: */}
              <div className={css['cube']} id="cube" />
              <Cube />
            </div>

            <div className="section">
              <div className={css['info-container']}>
                <div className={`${css['info']}`}>
                  <Link href="#video" className={`button blue-fill ${css['video-recap-button']}`}>
                    <span>
                      <YoutubeIcon /> Watch Video Recap
                    </span>
                  </Link>

                  <p className={css['description']}>
                    <span>
                      A <b className={css['red-underline']}>collaborative</b>
                    </span>{' '}
                    <b>Ethereum</b> <span>week, built by and for</span> <b>everyone.</b>
                  </p>
                </div>
              </div>
            </div>

            <div className={`section ${css['bottom-section']}`}>
              <div className={`${css['bottom']} clear-vertical`}>
                <Logo />

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
            </div>
          </Scene>

          <Scene growVertically growNaturally id="event-retro" className={`${css['scene-event-retro']} section`}>
            <div className={`${css['background']} expand`}>
              <Image src={BluePrint} objectFit="contain" alt="Building outline" />
            </div>
            <h1 className="section-header grey clear-vertical" style={{ zIndex: 1 }}>
              Devconnect // Amsterdam 2022
            </h1>

            <div className={`${css['columns']} clear-vertical`}>
              <div className={css['left']}>
                <div>
                  <p className="big-text">
                    Thanks to all those who came to the first ever Devconnect. What started out as an experimental idea
                    turned into one of the most impactful Ethereum events to date — thank you for being a part of it!
                    Hope to see you at the next one.
                  </p>
                  <p className="big-text">
                    While Devconnect is over, the Dutch ethereum community continues to grow! If you wish to get
                    involved, you can join the Ethereum DEV NL meetup group.
                  </p>
                </div>
                <Link
                  href="https://www.meetup.com/Ethereum-DEV-NL/"
                  className={`button purple ${css['get-involved-button']}`}
                  indicateExternal
                >
                  Ethereum DEV NL
                </Link>
              </div>
              <div className={css['right']}>
                <div className="aspect" id="video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/6X0yIUq7fpc"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            <div className={`${css['gallery']}`}>
              <div className={css['grid-item']}>
                <Image src={Cowork1} alt="Cowork space example" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork2} alt="Cowork space example" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork3} alt="Cowork space example" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork4} alt="Cowork space example" layout="fill" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork5} alt="Cowork space example" />
              </div>
            </div>
          </Scene>

          <div id="about" className={`${css['scene-about']}`}>
            <div className="section">
              <div className={`${css['scene-about-content']} clear-vertical`}>
                <h1 className="section-header">What is Devconnect?</h1>

                <div className={css['text-container']}>
                  <div className={css['body']}>
                    <div className={`background-title clear-vertical`}>DEV/CONNECT</div>
                    <div>
                      <p className={`subheader as-text-body`}>DEVCONNECT - [ DeV-kuUUUh-nEEeKKt ]</p>
                      <p className="section-header as-text-body">
                        Devconnect is a week-long in-person gathering that will feature independent Ethereum events,
                        each with a unique focus.
                      </p>
                      <p className="section-header as-text-body">
                        The goal is to focus on depth-first sessions rather than size, and to bring the Ethereum
                        community together in smaller groups to talk, learn about, or make serious progress on specific
                        subjects.
                      </p>
                    </div>

                    <Link
                      href="https://blog.ethereum.org/2022/05/30/devconnect-wrap/"
                      className={`button ${css['get-involved-button']}`}
                      indicateExternal
                    >
                      Read blog post
                    </Link>
                  </div>

                  <div className={css['cube-images']}>
                    <div>
                      <Image
                        src={CubeImages}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="right"
                        alt="Devconnect event images"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Scene growVertically growNaturally id="faq" className={`${css['scene-faq']} section`}>
            <div className={`clear-vertical`}>
              <h1 className="section-header grey">FAQ</h1>

              <div className={`${css['accordion']} tab-content`}>
                <Accordion>
                  {FAQ.map(faq => {
                    return (
                      <AccordionItem key={faq.text} title={faq.text} id={faq.value}>
                        {faq.content && faq.content()}
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </div>
          </Scene>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Home
