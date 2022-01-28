import { NextPage } from 'next'
import React from 'react'
import { Header, Footer } from './index'
import Hero from 'common/components/hero'
import CoworkHero from 'assets/images/cowork-hero.png'
import Cowork1 from 'assets/images/cowork-gallery/cowork-1.png'
import Cowork2 from 'assets/images/cowork-gallery/cowork-2.png'
import Cowork3 from 'assets/images/cowork-gallery/cowork-3.png'
import Cowork4 from 'assets/images/cowork-gallery/cowork-4.png'
import Cowork5 from 'assets/images/cowork-gallery/cowork-5.png'
import Image from 'next/image'
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
        <div className={`section fade-in-up`}>
          <div className="clear-vertical">
            <div className={`${css['body']}`}>
              <div className={css['left']}>
                <p className={`uppercase bold large-text ${css['title']}`}>Coworking</p>
                <p className={`uppercase bold`}>Devconnect</p>
                <p>
                  As part of our goal to foster <b>collaboration and community</b> throughout Devconnect week, we will
                  be hosting a co-work space for all those coming to Amsterdam to use as a meeting point, a place to
                  work, and a space to relax.
                </p>
                <p className={`small-text`}>
                  While all of the other events happening throughout the week will be independently-organized events,
                  this co-working space will be officially hosted by the <b>Devconnect</b> team.
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
                  <p className={`large-text bold ${css['title']}`}>How to Attend?</p>

                  <p className={`bold`}>
                    Tickets for the co-working space will be sold by our team and will be good for the entire week.
                    Prices and specific details will be announced soon.
                  </p>
                </div>
              </div>
            </div>
            <div className={`border-top ${css['gallery']}`}>
              <div className={css['grid-item']}>
                <div className={css['image-wrapper']}>
                  <Image src={Cowork1} alt="cowork-space-1" />
                </div>
              </div>
              <div className={css['grid-item']}>
                <div className={css['image-wrapper']}>
                  <Image src={Cowork2} alt="cowork-space-2" />
                </div>
              </div>
              <div className={css['grid-item']}>
                <div className={css['image-wrapper']}>
                  <Image src={Cowork3} alt="cowork-space-3" />
                </div>
              </div>
              <div className={css['grid-item']}>
                <div className={css['image-wrapper']}>
                  <Image src={Cowork4} alt="cowork-space-4" />
                </div>
              </div>
              <div className={css['grid-item']}>
                <div className={css['image-wrapper']}>
                  <Image src={Cowork5} alt="cowork-space-5" layout="fill" objectFit="cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={css['map']}>
        <div className={css['directions']}>
          <div className={`section`}>
            <div className="clear-vertical">
              <p className={`large-text bold uppercase`}>Directions</p>
            </div>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.7437976717924!2d4.893982616106426!3d52.37506545471201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c787f17ca7%3A0xfdc6eede688a772f!2sBeurs%20van%20Berlage!5e0!3m2!1sen!2sdk!4v1643376954216!5m2!1sen!2sdk"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
      </div>
      <Footer />
    </>
  )
}

export default Cowork
