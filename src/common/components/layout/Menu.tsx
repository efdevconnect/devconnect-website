import React from 'react'
import css from './menu.module.scss'
import Link from 'next/link'
import TwitterIcon from 'assets/icons/twitter.svg'
import ChevronDown from 'assets/icons/chevron-down.svg'
import HamburgerIcon from 'assets/icons/menu.svg'
import ChevronUp from 'assets/icons/chevron-up.svg'
import ArrowUpIcon from 'assets/icons/arrow-up.svg'
import ArrowDropdown from 'assets/icons/arrow-dropdown.svg'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { createPortal } from 'react-dom'
import { Footer } from 'pages/index'

const MultiLink = (props: any) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={css['multi-link']} onClick={() => setOpen(!open)}>
      {props.children}

      <div className={css['hover-to-open']}>
        <ArrowDropdown />
      </div>

      <div className={css['click-to-open']}>{open ? <ChevronUp /> : <ChevronDown />}</div>

      <div className={`${css['dropdown']} ${open && css['open']}`}>
        <div className={`${css['dropdown-content']} fade-in-up fast`}>
          {props.to.map((menuItem: any) => {
            return (
              <Link key={menuItem.text} href={menuItem.url}>
                {menuItem.text}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const menuItems = [
  {
    text: 'About',
    url: '/',
  },
  {
    text: 'Schedule',
    url: '/schedule',
  },
  {
    text: 'Cowork',
    url: '/cowork',
  },
  {
    text: 'Amsterdam',
    url: '/city-guide',
  },
  {
    text: 'Get Involved',
    children: [
      {
        text: 'Devconnect 2: Electric Boogaloo',
        url: 'https://forms.gle/m5KWJ3aX5H3kTR7s6',
      },
      {
        text: 'Clickable short',
        url: 'https://forms.gle/m5KWJ3aX5H3kTR7s6',
      },
      {
        text: 'JPGs are killing the environment',
        url: 'https://forms.gle/m5KWJ3aX5H3kTR7s6',
      },
    ],
  },
]

const Mobile = () => {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open, mounted])

  if (!mounted) return null

  return (
    <div className={css['mobile-menu']}>
      <div className={css['foldout-toggle']} onClick={() => setOpen(!open)}>
        <HamburgerIcon />
      </div>

      {createPortal(
        <div className={`${open ? css['open'] : ''} ${css['foldout']}`}>
          <div className={`${css['foldout-toggle']} clear`} onClick={() => setOpen(!open)}>
            <p className="uppercase bold underline">Devconnect</p>
            <HamburgerIcon />
          </div>

          <Footer inFoldoutMenu />
        </div>,
        document.body
      )}
    </div>
  )
}

export const FooterMenu = (props: any) => {
  return (
    <div className={css['footer-menu']}>
      <AnchorLink href="#__next" id="back-to-top" className={`${css['back-to-top']} dark-grey`}>
        Back to top <ArrowUpIcon />
      </AnchorLink>

      {menuItems.map((menuItem: any) => {
        const isMultiLink = !!menuItem.children

        if (isMultiLink) {
          return (
            <MultiLink key={menuItem.text} to={menuItem.children}>
              {menuItem.text}
            </MultiLink>
          )
        }

        return (
          <Link key={menuItem.text} href={menuItem.url}>
            {menuItem.text}
          </Link>
        )
      })}

      <a className={css['twitter']} target="_blank" rel="noreferrer" href="https://twitter.com/efdevconnect">
        <TwitterIcon style={{ fill: 'white' }} />
      </a>
    </div>
  )
}

export const Menu = (props: any) => {
  return (
    <div className={css['menu']}>
      <Mobile />

      {menuItems.map((menuItem: any) => {
        const isMultiLink = !!menuItem.children

        if (isMultiLink) {
          return (
            <MultiLink key={menuItem.text} to={menuItem.children}>
              {menuItem.text}
            </MultiLink>
          )
        }

        return (
          <Link key={menuItem.text} href={menuItem.url}>
            {menuItem.text}
          </Link>
        )
      })}

      <a className={css['twitter']} target="_blank" rel="noreferrer" href="https://twitter.com/efdevconnect">
        <TwitterIcon style={{ fill: 'white' }} />
      </a>
    </div>
  )

  // return (
  //   <div className={css['menu']}>
  //     <AnchorLink href="#__next" className={`${css['back-to-top']} dark-grey`}>
  //       Back to top <ArrowUpIcon />
  //     </AnchorLink>

  //     <Link href="/">About</Link>

  //     <Link href="/schedule">Schedule</Link>

  //     <Link href="/cowork">Cowork</Link>

  //     <Link href="/city-guide">Amsterdam</Link>

  //     <a target="_blank" rel="noreferrer" href="https://forms.gle/m5KWJ3aX5H3kTR7s6">
  //       Get Involved
  //     </a>

  //     <a target="_blank" rel="noreferrer" href="https://twitter.com/efdevconnect">
  //       <TwitterIcon style={{ fill: 'white' }} />
  //     </a>
  //   </div>
  // )
}

// export default Menu
