import React from 'react'
import css from './menu.module.scss'
import Link from '../link/Link'
import TwitterIcon from 'assets/icons/twitter.svg'
import DiscordIcon from 'assets/icons/discord.svg'
import TelegramIcon from 'assets/icons/telegram.svg'
import ChevronDown from 'assets/icons/chevron-down.svg'
import HamburgerIcon from 'assets/icons/menu.svg'
import IconCross from 'assets/icons/cross.svg'
import ChevronUp from 'assets/icons/chevron-up.svg'
import ArrowUpIcon from 'assets/icons/arrow-up.svg'
import ArrowDropdown from 'assets/icons/arrow-dropdown.svg'
import DevconnectAmsterdam from 'assets/images/amsterdam-logo-text.svg'
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
            if (menuItem.external) {
              return (
                <Link key={menuItem.text} href={menuItem.url} target="_blank" rel="noreferrer" indicateExternal>
                  {menuItem.text}
                </Link>
              )
            }

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
    text: 'Co-work',
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
        text: 'Host an event',
        external: true,
        url: 'https://ef-events.notion.site/Host-an-event-at-Devconnect-8d1c95ea7f4f41d9a4239eb87ed1fb03',
      },
      {
        text: 'Volunteer',
        external: true,
        url: 'https://forms.gle/6eoj7wDjXx6qhNj78',
      },
      {
        text: 'Press Inquiry',
        external: true,
        url: 'https://forms.gle/wV9hKjFdmhw38gbF8',
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
      <div className={css['foldout-toggle']}>
        <div className={css['icon']} onClick={() => setOpen(true)}>
          <HamburgerIcon className="large-text-em" />
        </div>
      </div>

      {createPortal(
        <div className={`${open ? css['open'] : ''} ${css['foldout']}`}>
          <div className={`${css['foldout-toggle']} clear`}>
            {/* <p className="uppercase bold underline">Devconnect</p> */}
            <DevconnectAmsterdam width="100px" height="50px" />
            <div className={css['icon']} onClick={() => setOpen(false)}>
              <IconCross />
            </div>
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
    <div className={css['footer-menu']} id="footer-menu">
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

      <div className={css['social-media']}>
        <a target="_blank" rel="noreferrer" href="https://twitter.com/efdevconnect">
          <TwitterIcon style={{ fill: 'white' }} />
        </a>

        <a target="_blank" rel="noreferrer" href="https://discord.gg/FhmA3KeF3B">
          <DiscordIcon style={{ fill: 'white' }} />
        </a>

        <a target="_blank" rel="noreferrer" href="https://t.me/efdevconnect">
          <TelegramIcon style={{ fill: 'white' }} />
        </a>
      </div>
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

      <div className={css['social-media']}>
        <a target="_blank" rel="noreferrer" href="https://twitter.com/efdevconnect">
          <TwitterIcon style={{ fill: 'white' }} />
        </a>

        <a target="_blank" rel="noreferrer" href="https://discord.gg/FhmA3KeF3B">
          <DiscordIcon style={{ fill: 'white' }} />
        </a>

        <a target="_blank" rel="noreferrer" href="https://t.me/efdevconnect">
          <TelegramIcon style={{ fill: 'white' }} />
        </a>
      </div>
    </div>
  )
}
