import React, { ReactNode } from 'react'
import Link from 'next/link'
import LinkIndicator from 'assets/icons/link-indicator.svg'

type LinkProps = {
  children: ReactNode
  indicateExternal?: boolean // Whether or not to add an external link indicator (if the url is a FQDN)
  allowDrag?: boolean
  to: string
  [key: string]: any
}

export const useDraggableLink = () => {
  const dragging = React.useRef(false)

  return {
    onMouseDown: () => {
      dragging.current = false
    },
    onMouseMove: () => {
      dragging.current = true
    },
    onClick: (e: React.SyntheticEvent) => {
      if (dragging.current) {
        e.preventDefault()
      }
    },
    draggable: false,
  }
}

const WrappedLink = React.forwardRef(
  ({ children, indicateExternal, external, allowDrag, href, ...rest }: LinkProps, ref: any) => {
    const isMailTo = href.startsWith('mailto:')
    const linkAttributes = {
      ...rest,
      className: rest.className ? `${rest.className} generic` : 'generic',
      ...useDraggableLink(),
    }

    if (isMailTo) {
      return (
        <a href={href} ref={ref} {...linkAttributes}>
          {children}
        </a>
      )
    }

    // Detects fully qualified domain name
    // One caveat to this approach is that you could link to a devcon.org page via a FQDN, and it would be detected as external:
    // Make sure to always use relative links for internal navigation
    const isExternal = href.match(/^([a-z0-9]*:|.{0})\/\/.*$/)

    // External links have no use of next Link component
    if (isExternal) {
      return (
        <a href={href} ref={ref} {...linkAttributes} target="_blank" rel="noopener noreferrer">
          {children}{' '}
          {indicateExternal && <LinkIndicator style={{ fontSize: '0.6em', position: 'relative', top: '-3px' }} />}
        </a>
      )
    }

    return (
      <Link href={href}>
        <a {...linkAttributes}>{children}</a>
      </Link>
    )
  }
)

WrappedLink.displayName = 'LinkComponent'

export default WrappedLink
