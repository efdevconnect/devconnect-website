import React from 'react'
import Image from 'next/image'
import css from './hero.module.scss'
import { Header } from 'pages/index'

type HeroProps = {
  imageProps: {
    src: any
    alt: string
  }
  children: React.ReactChild | React.ReactChild[]
  className?: string
}

const Hero = (props: HeroProps) => {
  let className = css['hero']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <Header />
      <div className={`${css['content']} section`}>
        <div className={`${css['children']} clear-vertical`}>
          <div className={css['aspect-container']}>
            <div className="aspect">{props.children}</div>
          </div>
        </div>
        <div className={css['image']}>
          <Image {...props.imageProps} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  )
}

export default Hero
