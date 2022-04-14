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
import SunEmoji from 'assets/images/sun-heart-emoji.png'
import { SEO } from 'common/components/SEO'
import { Menu, FooterMenu } from 'common/components/layout/Menu'
import Link from 'common/components/link/Link'
import Accordion, { AccordionItem } from 'common/components/accordion'
import Modal from 'common/components/modal'

const Cube = dynamic(() => import('common/components/cube'), {
  ssr: false,
})

const FAQ = [
  {
    text: 'What are the COVID policies?',
    value: 'covid policies',
    content: () => {
      return (
        <p>
          While each event during Devconnect is independently-hosted and it is up to their discretion for what COVID
          policies they adhere to (see their respective websites), the Co-work Space will be hosted by the Devconnect
          team, and we will be implementing whatever COVID requirements are mandated by the government of The
          Netherlands at the start of the event.
          <br /> <br />
          Please continue to monitor the requirements prior to your travel and arrival in Amsterdam for Devconnect. The
          Government of Netherlands continues to update their policies. New policies have come into effect as of 23
          March 2022. Visit the{' '}
          <Link href="https://www.government.nl/topics/coronavirus-covid-19" indicateExternal>
            official website
          </Link>{' '}
          to learn more.
        </p>
      )
    },
  },
  {
    text: 'Where can I get COVID tests in Amsterdam?',
    value: 'covid testing',
    content: () => {
      return (
        <p>
          There are plenty of spots around the city of Amsterdam to get a COVID-19 test.
          <br /> <br />
          Testing is performed by the{' '}
          <Link href="https://www.ggd.amsterdam.nl/english/coronavirus/testing-amsterdam/" indicateExternal>
            GGD (Netherlands Municipal Health Service)
          </Link>{' '}
          with &amp; without appointments.
          <br /> <br />
          Appointments can be made{' '}
          <Link href="https://coronatest.nl/" indicateExternal>
            here
          </Link>{' '}
          (best to visit the site from a Netherlands IP address).
          <br /> <br />
          Please get tested if you feel ill or have cold or flu-like symptoms. We are grateful for the lifting of many
          COVID restrictions in the Netherlands, but we still want to keep everyone healthy &amp; safe.
        </p>
      )
    },
  },
  {
    text: 'How do I sponsor?',
    value: 'tickets refundable',
    content: () => {
      return (
        <p>
          While Devconnect will be sponsor-free, independent events happening throughout Devconnect may be looking for
          sponsorship. If you&apos;re interested in sponsoring, check out relevant events to see if they are accepting
          sponsorships.
        </p>
      )
    },
  },
  {
    text: 'From my understanding, Devconnect will just be separate events hosted by individual projects/teams/individuals, correct?',
    value: 'tickets refundable',
    content: () => {
      return <p>This is correct!</p>
    },
  },
  {
    text: 'Will there be a central venue where these events will be held, or is each host responsible for locating avenue for their event?',
    value: 'tickets refundable',
    content: () => {
      return (
        <p>
          Each host is responsible for their own venue. There will be many events in many different venues throughout
          Amsterdam during the week. Attendees will need to pick and choose based on their interest.
        </p>
      )
    },
  },
  {
    text: 'Will there be any "main events" hosted directly by Devconnect?',
    value: 'tickets refundable',
    content: () => {
      return (
        <p>
          There will be an open Co-Working space throughout the week with tickets available to all. This will be in
          Beurs van Berlage. Other than that, all events will be independently hosted.
        </p>
      )
    },
  },
  {
    text: 'Approximately how many people will fit at each event?',
    value: 'tickets refundable',
    content: () => {
      return (
        <p>
          Sizes will vary, and range from a 25-person zkEVM workshop for example, to a 300-person event on staking by
          ETHStaker, to a 800-person ETHGlobal hackathon. Some are private, some free, some will be based on
          applications, and others may be ticketed with paid tickets.
        </p>
      )
    },
  },
  {
    text: 'What is the primary audience you are hoping to attract for Devconnect?',
    value: 'tickets refundable',
    content: () => {
      return (
        <p>
          While this does vary by event, the focus in general are those who are involved/interested in the ecosystem in
          one particular area and want to dive deeper!
        </p>
      )
    },
  },
  {
    text: 'Does Devconnect schedule list all the blockchain events happening in Amsterdam that week? (Where are all the parties🎉?)',
    value: 'events',
    content: () => {
      return (
        <p>
          Our goal with Devconnect is to encourage decentralized co-ordination of an Ethereum based event series. There
          will naturally be a lot more events, parties, and activities taking place the week of Devconnect that are not
          listed on our event schedule. Please check out the community driven AMS Blockchain Week schedule{' '}
          <Link href="https://amsterdamblockchainweek.org/" indicateExternal>
            located here
          </Link>
          &nbsp;for more events, parties, and activities that you may be interested in.
        </p>
      )
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
                  <div
                    className={css['date-container']}
                    onMouseEnter={() => setDateHovered(true)}
                    onMouseLeave={() => setDateHovered(false)}
                  >
                    <p className={`${css['date']} subheader`}>April 18-25, 2022</p>
                    {dateHovered && <Image src={FingersCrossed} alt="Fingers crossed" />}
                  </div>

                  <p className={`${css['place']} subheader`}>Amsterdam, Netherlands</p>

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

          <Scene growVertically growNaturally id="about" className={`${css['scene-about']}`}>
            <div className="section">
              <div className={`${css['scene-about-content']} clear-vertical`}>
                <h1 className="section-header">About</h1>

                <div className={css['text-container']}>
                  <div className={css['body']}>
                    <p className={`background-title`}>DEV/CONNECT</p>
                    <p className={`subheader as-text-body`}>DEVCONNECT - [ DeV-kuUUUh-nEEeKKt ]</p>
                    <p className="section-header as-text-body">
                      Devconnect is a week-long in-person gathering that will feature independent Ethereum events, each
                      with a unique focus. The goal is to focus on depth-first sessions rather than size, and to bring
                      the Ethereum community together in smaller groups to talk, learn about, or make serious progress
                      on specific subjects.
                    </p>

                    <p className="subheader as-text-body">
                      Events at and around Devconnect will be independently hosted and curated by experts in those
                      domains.
                    </p>

                    <p className="subheader as-text-body">
                      As for everyone coming to town and wanting to hang out and work together between events,
                      we&apos;ll maintain a{' '}
                      <Link href="/cowork" className={`bold ${css['cowork-link']}`}>
                        space for collaboration
                      </Link>{' '}
                      for all who are interested.
                    </p>

                    <Link
                      href="https://blog.ethereum.org/2021/12/13/announcing-devconnect/"
                      target="_blank"
                      rel="noreferrer"
                      className={`subheader ${css['read-blog']}`}
                      indicateExternal
                    >
                      READ BLOG POST
                    </Link>
                  </div>

                  <div className={css['sun-emoji']}>
                    {/* <DevconnectAmsterdam /> */}
                    <Image src={SunEmoji} objectFit="contain" alt="Sun emoji" />
                  </div>
                </div>

                <div className={css['topics-container']}>
                  <p className="subheader as-text-body">Topics Include</p>
                  <HorizontalLooper slow unpadded>
                    <p className="section-header">
                      zkEVM • metaverse • STAKING • CONSENSUS LAYER • Web3 UX • NFTS • solidity • governance • developer
                      infrastructure • Execution Layer • Web2 ➞ Web3 dev • ETHconomics • Rollups • MEV • Security •
                      Sustainability • Advocacy • VDFs • Hackathon • Workshops •&nbsp;
                    </p>
                  </HorizontalLooper>
                </div>

                <div className={css['buttons']}>
                  <Link href="/schedule" className={`button ${css['view-schedule']}`}>
                    View Schedule
                  </Link>

                  <Link
                    href="https://discord.gg/FhmA3KeF3B"
                    className={`button ${css['get-involved-button']}`}
                    indicateExternal
                  >
                    Discord
                  </Link>

                  <Link
                    href="https://ef-events.notion.site/Host-an-event-at-Devconnect-8d1c95ea7f4f41d9a4239eb87ed1fb03"
                    className={`button ${css['get-involved-button']}`}
                    indicateExternal
                  >
                    Host an Event
                  </Link>
                </div>
              </div>
            </div>
          </Scene>

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

          {/* <Scene growVertically id="amsterdam" className={`${css['scene-amsterdam']} section`}>
          <h1 className="section-header clear-vertical grey">
            Amsterdam <br /> Netherlands
          </h1>

          <div className={`clear ${css['content']}`}>
            <div className={css['text-container']}>
              <div className={css['background-header']}>
                <HorizontalLooper>
                  <p className={`massive-header`}>Amsterdam</p>
                  <p className={`massive-header`}>Amsterdam</p>
                  <p className={`massive-header`}>Amsterdam</p>
                </HorizontalLooper>
              </div>
              <p className={`${css['about-text']} subheader as-text-body`}>AMSTERDAM - [ ahm-stuhr-dahYUMMMm ]</p>
              <p className="section-header as-text-body">
                Amsterdam is known as one of the world’s most multicultural cities.
              </p>
              <p className="section-header as-text-body">
                Like Ethereum, it can mean many things to many different people, and there’s something interesting for
                everyone. So where better to give a distributed (and passionate) ecosystem a more connected feel than in
                a city brought together by canals 🛶, bike lanes 🚲, and culture 🏫 throughout?
              </p>
            </div>
            <div className={css['image']}>
              <Image src={Amsterdam} objectFit="cover" layout="fill" alt="Amsterdam" />
            </div>
          </div>
        </Scene> */}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Home
