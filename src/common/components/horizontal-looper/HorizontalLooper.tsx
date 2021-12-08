import React from 'react'
import css from './horizontal-looper.module.scss'

const HorizontalLooper = (props: any) => {
  return (
    // <div>
    <div className={css['inner-wrap']}>
      <div className={css['marquee-style']}>{props.children}</div>
      <div className={css['marquee-style-2']}>{props.children}</div>
    </div>
    // </div>
  )
}

export default HorizontalLooper
