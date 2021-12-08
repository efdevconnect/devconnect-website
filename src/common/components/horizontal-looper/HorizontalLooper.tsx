import React from 'react'
import css from './horizontal-looper.module.scss'

const HorizontalLooper = (props: any) => {
  let className = css['wrap']

  if (props.slow) className += ` ${css['slow']}`

  return (
    <div className={className}>
      <div className={css['marquee-style']}>{props.children}</div>
      <div className={css['marquee-style-2']}>{props.children}</div>
    </div>
  )
}

export default HorizontalLooper
