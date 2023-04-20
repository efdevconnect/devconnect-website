import React from 'react'

type FadeInProps = {
  children?: React.ReactChild
}

const FadeIn = (props: any) => {
  const childRef = React.createRef<any>()
  const [enteredViewPort, setEnteredViewPort] = React.useState(false)

  React.useEffect(() => {
    if (!childRef.current) return

    const observer = new IntersectionObserver(
      rects => {
        const rect = rects[0]
        if (rect && rect.isIntersecting) {
          setEnteredViewPort(true)
        }
      },
      {
        root: null, // null means root is viewport
        rootMargin: '0px',
        threshold: 0.1,
      }
    )

    observer.observe(childRef.current)

    return () => observer.disconnect()
  }, [childRef])

  let className = props.children.props.className

  if (enteredViewPort) className += ' fade-in-up'

  return React.cloneElement(props.children, {
    ref: childRef,
    className,
    style: {
      opacity: enteredViewPort ? 1 : 0,
    },
  })
}

export default FadeIn
