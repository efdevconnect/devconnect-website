import { NextPage } from 'next'
import React from 'react'
import { Header, Footer } from './index'
import Hero from 'common/components/hero'
import AmsterdamHero from 'assets/images/amsterdam-hero.jpg'
import css from './city-guide.module.scss'
import { SEO } from 'common/components/SEO'
import SwipeToScroll from 'common/components/swipe-to-scroll'
import ChevronDown from 'assets/icons/chevron-down.svg'
import ChevronUp from 'assets/icons/chevron-up.svg'
// import Sun from 'assets/icons/sun.svg'
import Visa from 'assets/icons/visa.svg'
import Clock from 'assets/icons/clock.svg'
import Globe from 'assets/icons/globe.svg'
import Dollar from 'assets/icons/dollar.svg'
import Water from 'assets/icons/water.svg'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Link, { useDraggableLink } from 'common/components/link'

const tabs = [
  {
    text: 'General info',
    value: 'general-info',
  },
  {
    text: 'Airport transit',
    value: 'airport-transit',
    content: () => {
      return (
        <div className={`${css['tab-content']} small-text ${css['airport-transit']}`}>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>Ride Sharing</p>
            <p className="small-text">
              You can easily Uber or Bolt into Amsterdam or to the Airport. Schiphol Airport is not too far from the
              City Center.
            </p>
          </div>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>Metro</p>
            <Link href="https://www.amsterdam.info/transport/metro/" className="small-text hover-underline">
              <p>View Metro Routes</p>
            </Link>
            <p className="small-text">
              The Metro will likely have a stop close to your accommodation. <br />
              There is a direct metro to Centraal (main station) which also then has access to many more metro and tram
              stops.After midnight, trains from Schiphol Airport to Centraal Station run hourly rather than every 10-15
              minutes, a taxi, Uber, or Bolt will be your best option.
            </p>
          </div>
        </div>
      )
    },
  },
  {
    text: 'Getting around',
    value: 'getting-around',
    content: () => {
      return (
        <div className={`${css['tab-content']} small-text ${css['getting-around']}`}>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>Public Transport</p>
            <p className="small-text">
              Amsterdam is easy to bike and harder to drive. Cyclists can make use of the many bike-friendly streets
              while parking is expensive in Center.
            </p>
            <p className="small-text">There is a great public transport system: Train, Tram, Metro, &amp; Bus.</p>
            <p className="small-text underline">Transport System</p>

            <p className="small-text">
              Amsterdam&apos;s public transport network runs on a ticketing system called <i>GVB</i>.
            </p>
            <p className="small-text">
              Downloading the{' '}
              <Link
                href="https://en.gvb.nl/klantenservice/reizen-met-de-gvb-reisapp-0"
                className="small-text hover-underline"
              >
                GVB public transport app
              </Link>{' '}
              should come in handy.
              <br />
              Or download the{' '}
              <Link
                href="https://www.iamsterdam.com/media/pdf/visiting-uit/getting-around/artt-map-nz-lijn-2020.pdf?la=en"
                className="small-text hover-underline"
              >
                map
              </Link>{' '}
              in advance.
            </p>

            <p className="small-text underline">Travel passes</p>
            <p className="small-text">
              Buy an{' '}
              <Link
                href="https://www.ov-chipkaart.nl/purchase-an-ov-chipkaart.htm"
                className="small-text hover-underline"
              >
                OV-chipkaart
              </Link>{' '}
              for travel around the city
            </p>
            <p className="small-text">Top this up at any public transport station, or buy day passes, etc.</p>
          </div>

          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>Bike Rentals</p>
            <p className="small-text">A lot of bike rentals can be found around the Centraal Station.</p>

            <Link href="https://www.macbike.nl/" className="small-text hover-underline">
              <p>MAC Bike — Popular for tourists.</p>
            </Link>
            <Link href="https://www.yellowbike.nl/en/" className="small-text hover-underline">
              <p>Yellow Bike</p>
            </Link>
            <Link href="https://www.rentabike.nl/" className="small-text hover-underline">
              <p>Rentabike</p>
            </Link>
          </div>
        </div>
      )
    },
  },
  // {
  //   text: 'ETH accepted at',
  //   value: 'eth-accepted-at',
  // },
  // {
  //   text: 'Areas to stay',
  //   value: 'areas-to-stay',
  //   content: () => {
  //     return <div className={`${css['tab-content']} ${css['areas-to-stay']}`}>areas to stay</div>
  //   },
  // },
  // {
  //   text: 'Food and drink',
  //   value: 'food-and-drink',
  //   content: () => {
  //     return (
  //       <div className={`${css['tab-content']} ${css['food-and-drink']}`}>
  //         <ul>
  //           <li>
  //             There are so many options for eating and drinking in Amsterdam, especially in the City Center — it’s hard
  //             to name just a few!
  //           </li>
  //         </ul>
  //         There are so many options for eating and drinking in Amsterdam, especially in the City Center — it’s hard to
  //         name just a few! Best Apple pie in Amsterdam Winkel43 Brown Bars and wine bars are in abundance Eating Borrel
  //         is super popular at these bars Bitterballen Kroket Friet (fries) Also popular to eat Poffertjes Stroopwafel
  //         Kibbeling Dutch Cheeses Pannekoeken Amsterdam based breweries are Brouwerij 't IJ, Oedipus or Troost
  //       </div>
  //     )
  //   },
  // },
  {
    text: 'FAQ',
    value: 'faq',
    content: () => {
      return (
        <div className={`${css['tab-content']} small-text  ${css['faq']}`}>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>How do I sponsor?</p>
            <p>
              While Devconnect will be sponsor-free, independent events happening throughout Devconnect may be looking
              for sponsorship. If you’re interested in sponsoring, check out relevant events to see if they are
              accepting sponsorships.
            </p>
          </div>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>
              From my understanding, Devconnect will just be separate events hosted by individual
              projects/teams/individuals, correct?
            </p>
            <p>This is correct!</p>
          </div>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>
              Will there be a central venue where these events will be held, or is each host responsible for locating a
              venue for their event?
            </p>
            <p>
              Each host is responsible for their own venue. There will be many events in many different venues
              throughout Amsterdam during the week. Attendees will need to pick and choose based on their interest.
            </p>
          </div>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>
              Will there be any &quot;main events&quot; hosted directly by Devconnect?
            </p>
            <p>
              There will be an open Co-Working space throughout the week with tickets available to all. This will be in
              Beurs van Berlage. Other than that, all events will be independently hosted.
            </p>
          </div>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>Approximately how many people will fit at each event?</p>
            <p>
              Sizes will vary, and range from a 25-person zkEVM workshop for example, to a 300-person event on staking
              by ETHStaker, to a 800-person EthGlobal hackathon. Some are private, some free, some will be based on
              applications, and others may be ticketed with paid tickets.
            </p>
          </div>
          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>
              What is the primary audience you are hoping to attract for Devconnect?
            </p>
            <p>
              While this does vary by event, the focus in general are those who are involved/interested in the ecosystem
              in one particular area and want to dive deeper!
            </p>
          </div>

          <div className={css['section']}>
            <p className={`${css['header']} small-text bold`}>
              How many people do you estimate will attend Devconnect?
            </p>
            <p>
              Given the many events taking place and shifting COVID measures, it is hard to estimate, but we’re
              estimating that ~1.5-2k attendees may join.{' '}
            </p>
          </div>
        </div>
      )
    },
  },
]

const Tabs = (props: any) => {
  const linkAttributes = useDraggableLink()

  return (
    <SwipeToScroll>
      <div className={css['tabs']}>
        {tabs.map((tab, index: number) => {
          let className = `uppercase ${css['tab']}`

          const toggled = index === 0

          if (toggled) className += ` ${css['always-toggled']} bold`

          return (
            <AnchorLink
              key={tab.value}
              href={`#${tab.value}`}
              className={className}
              {...linkAttributes}
              onClick={(e: any) => {
                if (props.accordionRefs.current[tab.value]) {
                  props.accordionRefs.current[tab.value].open()
                }

                linkAttributes.onClick(e)
              }}
            >
              {tab.text}
            </AnchorLink>
          )
        })}
      </div>
    </SwipeToScroll>
  )
}

const List = (props: any) => {
  return (
    <div className={css['list']}>
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Clock className={css['icon']} />
          <p className={`bold`}>Timezone: &nbsp;</p>
          <p>CET (UTC/GMT +1)</p>
        </div>
        <Link
          href="https://www.timeanddate.com/worldclock/netherlands/amsterdam"
          className={`${css['right']} blue uppercase tiny-text hover-underline`}
        >
          Current time
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Visa className={css['icon']} />
          <p className="bold">VISA:&nbsp;</p>
          <p>SCHENGEN SHORT-STAY</p>
        </div>
        <Link
          href="https://www.government.nl/topics/immigration-to-the-netherlands/question-and-answer/which-visa-do-i-need-to-travel-to-the-netherlands"
          className={`${css['right']} blue uppercase tiny-text hover-underline`}
        >
          REQUIREMENTS
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Dollar className={css['icon']} />
          <p className="bold">Currency:&nbsp;</p>
          <p>EURO (€ EUR)</p>
        </div>
        <Link
          href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=EUR"
          className={`${css['right']} blue uppercase tiny-text hover-underline`}
        >
          Exchange Rate
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Globe className={css['icon']} />
          <p className="bold">Official language:&nbsp;</p>
          <p> DUTCH </p>
        </div>
        <Link
          href="https://www.iamsterdam.com/en/about-amsterdam/amsterdam-information/history-and-society/language"
          className={`${css['right']} blue uppercase tiny-text hover-underline`}
        >
          Language Guide
        </Link>
      </div>
      {/* <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Sun className={css['icon']} />
          <p className="bold">AVG TEMP:&nbsp;</p>
          <p> AVG TEMP: 8 TO 20 °C / 46.4 to 68.0 °F</p>
        </div>
        <Link href="https://google.com" className={`${css['right']} blue uppercase tiny-text hover-underline`}>
          Packing tips
        </Link>
      </div> */}
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Water className={css['icon']} />
          <p className="bold">WATER: &nbsp;</p>
          <p>Tap water is safe to drink in Amsterdam.</p>
        </div>
        <AnchorLink
          href={`#faq`}
          className={`${css['right']} blue uppercase tiny-text hover-underline generic`}
          onClick={(e: any) => {
            if (props.accordionRefs.current.faq) {
              props.accordionRefs.current.faq.open()
            }
          }}
        >
          FAQ
        </AnchorLink>
      </div>
    </div>
  )
}

const Accordion = React.forwardRef((props: any, ref: any) => {
  const [open, setOpen] = React.useState(false)

  React.useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
    }
  })

  return (
    <div className={css['accordion']}>
      <div id={props.id} className={`uppercase bold big-text ${css['toggle']}`} onClick={() => setOpen(!open)}>
        <p className={css['big-text']}>{props.title}</p>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>
      {open && <div className={css['content']}>{props.children}</div>}
    </div>
  )
})

Accordion.displayName = 'Accordion'

const CityGuide: NextPage = () => {
  const accordionRefs = React.useRef({} as { [key: string]: any })

  return (
    <>
      <SEO title="City Guide" description="Devconnect city guide" />
      <Hero
        className={css['city-guide-hero']}
        backgroundClassName={css['background']}
        imageProps={{ src: AmsterdamHero, alt: 'Amsterdam' }}
      >
        <div className={css['hero-content']}>
          <p className="uppercase extra-large-text bold secondary title">Amsterdam —</p>

          <div className={css['items']}>
            {tabs.map(tab => {
              return (
                <AnchorLink
                  key={tab.value}
                  href={`#${tab.value}`}
                  className={`uppercase bold`}
                  onClick={() => accordionRefs.current[tab.value] && accordionRefs.current[tab.value].open()}
                >
                  {tab.text}
                </AnchorLink>
              )
            })}
          </div>
        </div>
      </Hero>

      <div className={css['city-guide']}>
        <div className="section fade-in-up">
          <div className={`${css['body']} clear-vertical`} id="general-info">
            <Tabs accordionRefs={accordionRefs} />

            <div className={css['general-info']}>
              <div className={css['left']}>
                <p className={`${css['title']} uppercase`}>
                  AMSTERDAM - <span className="bold">[ ahm-stuhr-dahYUMMMm ]</span>
                </p>

                <p className={`uppercase bold big-text ${css['details-1']}`}>
                  Amsterdam is known as one of the world’s most multicultural cities.{' '}
                </p>

                <p className={`${css['details-2']} bold`}>
                  Like Ethereum, it can mean many things to many different people, and there’s something interesting for
                  everyone. So where better to give a distributed (and passionate) ecosystem a more connected feel than
                  in a city brought together by canals 🛶, bike lanes 🚲, and culture 🏫 throughout?{' '}
                </p>
              </div>

              <div className={css['right']}>
                <List accordionRefs={accordionRefs} />
              </div>
            </div>

            <div className={css['accordions']}>
              {tabs.slice(1).map((tab, index) => {
                const tabContent = tabs[index + 1]

                return (
                  <Accordion
                    key={tab.value}
                    title={tab.text}
                    id={tab.value}
                    ref={el => (accordionRefs.current[tab.value] = el)}
                  >
                    {tabContent.content && tabContent.content()}
                  </Accordion>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CityGuide
