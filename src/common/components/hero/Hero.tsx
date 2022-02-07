import React from 'react'
import Image from 'next/image'
import css from './hero.module.scss'
import { Header } from 'pages/index'

type HeroProps = {
  imageProps?: {
    src: any
    alt: string
  }
  autoHeight?: boolean
  children: React.ReactChild | React.ReactChild[]
  className?: string
  backgroundClassName?: string
  backgroundTitle?: string
}

const Hero = (props: HeroProps) => {
  let className = css['hero']

  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <Header />
      <div className={props.backgroundClassName || css['background']} />
      <div className={`${css['content']} section`}>
        {props.backgroundTitle && <p className={`background-title clear-vertical`}>{props.backgroundTitle}</p>}
        <div className={`${css['children']} ${props.autoHeight ? css['auto-height'] : ' '} clear-vertical`}>
          {props.children}
        </div>
        {props.imageProps && (
          <div className={css['image']}>
            <div className={css['image-inner']}>
              <Image {...props.imageProps} layout="fill" objectFit="cover" priority />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero
