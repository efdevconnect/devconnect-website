import { NextPage } from 'next'
import React from 'react'
import { Header, Footer } from './index'
import Hero from 'common/components/hero'
import AmsterdamHero from 'assets/images/amsterdam-hero.jpg'
import css from './city-guide.module.scss'
import { SEO } from 'common/components/SEO'
import SwipeToScroll from 'common/components/swipe-to-scroll'

const tabs = [
  'General info',
  'Airport transit',
  'Getting around',
  'Crypto accepted at',
  'Areas to stay',
  'Food and drink',
  'FAQ',
]

type TabsProps = {
  selectedTab: string
  setSelectedTab: (nextTab: string) => void
}

const Tabs = ({ selectedTab, setSelectedTab }: TabsProps) => {
  return (
    <SwipeToScroll>
      <div className={css['tabs']}>
        {tabs.map(tab => {
          let className = css['tab']

          const selected = tab === selectedTab

          if (selected) className += ` ${css['selected']} bold`

          return (
            <p className={className} key={tab} onClick={() => setSelectedTab(tab)}>
              {tab}
            </p>
          )
        })}
      </div>
    </SwipeToScroll>
  )
}

const CityGuide: NextPage = (props: any) => {
  const [selectedTab, setSelectedTab] = React.useState('General info')

  return (
    <>
      <SEO title="City Guide" description="Devconnect city guide" />
      <Hero className={css['city-guide-hero']} imageProps={{ src: AmsterdamHero, alt: 'Some text' }}>
        <div className={css['hero-content']}>
          <p className="uppercase extra-large-text bold">Amsterdam —</p>

          <div>
            {tabs.map(tab => {
              return (
                <p key={tab} onClick={() => setSelectedTab(tab)} className="uppercase bold">
                  {tab}
                </p>
              )
            })}
          </div>
        </div>
      </Hero>

      <div className={css['city-guide']}>
        <div className="section">
          <div className={`${css['body']} clear-vertical`}>
            <Tabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

            <div className={css['general-info']}>
              <div className={css['left']}>
                <p className="uppercase bold large-text">AMSTERDAM - [ ahm-stuhr-dahYUMMMm ]</p>

                <p>Amsterdam is known as one of the world’s most multicultural cities. </p>

                <p>
                  Like Ethereum, it can mean many things to many different people, and there’s something interesting for
                  everyone. So where better to give a distributed (and passionate) ecosystem a more connected feel than
                  in a city brought together by canals 🛶, bike lanes 🚲, and culture 🏫 throughout?{' '}
                </p>
              </div>

              <div className={css['right']}></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CityGuide
