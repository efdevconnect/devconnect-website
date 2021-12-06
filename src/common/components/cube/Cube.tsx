import React, { useEffect } from 'react'
import css from './cube.module.scss'
import { init } from './webgl/js'

const PermanentDiv = React.memo(function MyComponent() {
  return <div className="content"></div>
})

const Cube = () => {
  useEffect(() => {
    init()
  }, [])

  // return null

  return (
    <div>
      <PermanentDiv />
    </div>
  )
}

export default Cube
