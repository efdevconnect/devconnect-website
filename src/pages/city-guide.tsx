import { NextPage } from 'next'
import React from 'react'
import { Header, Footer } from './index'
import Hero from 'common/components/hero'
import AmsterdamHero from 'assets/images/amsterdam-hero.png'
import css from './city-guide.module.scss'

const CityGuide: NextPage = (props: any) => {
  return (
    <>
      <Hero className={css['city-guide']} imageProps={{ src: AmsterdamHero, alt: 'Some text' }}>
        <p className="uppercase extra-large-text bold">Amsterdam — </p>
      </Hero>
      <Footer />
    </>
  )
}

export default CityGuide
