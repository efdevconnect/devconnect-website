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
import Sun from 'assets/icons/sun.svg'
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
  },
  {
    text: 'Getting around',
    value: 'getting-around',
  },
  {
    text: 'ETH accepted at',
    value: 'eth-accepted-at',
  },
  {
    text: 'Areas to stay',
    value: 'areas-to-stay',
  },
  {
    text: 'Food and drink',
    value: 'food-and-drink',
  },
  {
    text: 'FAQ',
    value: 'faq',
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

const List = () => {
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
          <Dollar className={css['icon']} />
          <p className="bold">Currency:&nbsp;</p>
          <p>EURO (€ EUR)</p>
        </div>
        <Link href="https://google.com" className={`${css['right']} blue uppercase tiny-text hover-underline`}>
          Exchange Rate
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Globe className={css['icon']} />
          <p className="bold">Official language:&nbsp;</p>
          <p> DUTCH </p>
        </div>
        <Link href="https://google.com" className={`${css['right']} blue uppercase tiny-text hover-underline`}>
          Languide Guide
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Sun className={css['icon']} />
          <p className="bold">AVG TEMP:&nbsp;</p>
          <p> AVG TEMP: 8 TO 20 °C / 46.4 to 68.0 °F</p>
        </div>
        <Link href="https://google.com" className={`${css['right']} blue uppercase tiny-text hover-underline`}>
          Packing tips
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} small-text uppercase`}>
          <Water className={css['icon']} />
          <p className="bold">WATER: &nbsp;</p>
          <p>Tap water is safe to drink in Amsterdam.</p>
        </div>
        <Link href="https://google.com" className={`${css['right']} blue uppercase tiny-text hover-underline`}>
          FAQS
        </Link>
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
      <div id={props.id} className={`uppercase bold ${css['toggle']}`} onClick={() => setOpen(!open)}>
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
      <Hero className={css['city-guide-hero']} imageProps={{ src: AmsterdamHero, alt: 'Some text' }}>
        <div className={css['hero-content']}>
          <p className="uppercase extra-large-text bold">Amsterdam —</p>

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
                <List />
              </div>
            </div>

            <div className={css['accordions']}>
              {tabs.slice(1).map(tab => {
                return (
                  <Accordion
                    key={tab.value}
                    title={tab.text}
                    id={tab.value}
                    ref={el => (accordionRefs.current[tab.value] = el)}
                  >
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised words which dont look even slightly
                    believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt
                    anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet
                    tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                    It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures,
                    to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free
                    from repetition, injected humour, or non-characteristic words etc.
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
