import { useEffect } from 'react'
import { init } from './webgl/js'

const Cube = () => {
  useEffect(() => {
    init()
  }, [])

  return null
}

export default Cube
