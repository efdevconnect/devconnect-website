import { NextPage } from 'next'
import React from 'react'
import { Header, Footer } from './index'
import Hero from 'common/components/hero'
import CoworkHero from 'assets/images/cowork-hero.png'
import css from './cowork.module.scss'
import PinIcon from 'assets/icons/pin.svg'
import TicketIcon from 'assets/icons/ticket.svg'
import { SEO } from 'common/components/SEO'

const Cowork: NextPage = (props: any) => {
  return (
    <>
      <SEO title="Cowork" description="Coworking at Devconnect" />
      <Hero className={css['cowork-hero']} imageProps={{ src: CoworkHero, alt: 'Some text' }}>
        <div className={css['content']}>
          <div>
            <p className="uppercase extra-large-text bold">CoWork — </p>

            <p className={`${css['info']} uppercase`}>
              <u>Beurs Van Berlage (BVB) 📍</u>
              <br />
              <span className="large-text">APRIL 18th — 25th</span>
              <br />
              every day 09:00 AM - 11:00 PM
            </p>
          </div>

          <div className={css['call-to-action']}>
            <a href="https://forms.gle/m5KWJ3aX5H3kTR7s6" target="_blank" rel="noreferrer" className={`button orange`}>
              <TicketIcon />
              Get Tickets
            </a>

            <a href="https://forms.gle/m5KWJ3aX5H3kTR7s6" target="_blank" rel="noreferrer" className={`button orange`}>
              <PinIcon />
              Directions
            </a>
          </div>
        </div>
      </Hero>

      <div className={css['cowork']}>
        <div className={`section`}>
          <div className="clear-vertical">
            <div className={`${css['body']}`}>
              <div className={css['left']}>
                <p className={`uppercase bold`}>Coworking</p>
                <p className={`uppercase`}>Devconnect</p>
                <p>
                  As part of our goal to foster <b>collaboration and community</b> throughout Devconnect week, we will
                  be hosting a co-work space for all those coming to Amsterdam to use as a meeting point, a place to
                  work, and a space to relax.
                </p>
                <p className={`tiny-text`}>
                  While all of the other events happening throughout the week will be independently-organized events,
                  this co-working space will be officially hosted by the Devconnect team.
                </p>
              </div>

              <div className={`${css['right']}`}>
                <div className={css['what-to-expect']}>
                  <p className={`large-text bold`}>What to expect?</p>
                  <p>
                    <b>Work.</b> Tables, wifi, outlets.
                  </p>

                  <p>
                    <b>Relax.</b> Comfy areas to relax alone or in small groups.
                  </p>
                  <p>
                    <b>Collab.</b> Several meeting rooms available for informal meetings.
                  </p>

                  <p>
                    <i>Light snacks and drinks will be offered throughout.</i>
                  </p>
                </div>

                <div className={`${css['how-to-attend']} border-top padding`}>
                  <p className={`large-text ${css['title']}`}>How to Attend?</p>

                  <p className={`bold`}>
                    Tickets for the co-working space will be sold by our team and will be good for the entire week.
                    Prices and specific details will be announced soon.
                  </p>
                </div>
              </div>
            </div>
            <div className={`border-bottom border-top ${css['gallery']}`}>Gallery</div>
          </div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77979.65162766135!2d4.833921203027313!3d52.35474979504272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c63fb5949a7755%3A0x6600fd4cb7c0af8d!2sAmsterdam%2C%20Netherlands!5e0!3m2!1sen!2sdk!4v1643121958966!5m2!1sen!2sdk"
        width="100%"
        height="450"
        loading="lazy"
      ></iframe>

      <Footer />
    </>
  )
}

export default Cowork
