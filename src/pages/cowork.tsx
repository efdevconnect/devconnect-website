import { NextPage } from 'next'
import React from 'react'
import { Header, Footer } from './index'
import Hero from 'common/components/hero'
import CoworkHero from 'assets/images/cowork-alt-2.jpg'
import Cowork1 from 'assets/images/cowork-gallery/cowork-1.png'
import Cowork2 from 'assets/images/cowork-gallery/cowork-2-low-footprint.jpg'
import Cowork3 from 'assets/images/cowork-gallery/cowork-3.png'
import Cowork4 from 'assets/images/cowork-gallery/cowork-4.png'
import Cowork5 from 'assets/images/cowork-gallery/cowork-5.png'
import Image from 'next/image'
import css from './cowork.module.scss'
import PinIcon from 'assets/icons/pin.svg'
import TicketIcon from 'assets/icons/ticket.svg'
import { SEO } from 'common/components/SEO'
import Link from 'common/components/link/Link'
import { Tabs } from './city-guide'
import Alert from 'common/components/alert'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'
// import Accordion, { AccordionItem } from 'common/components/accordion'

const Cowork: NextPage = (props: any) => {
  // const accordionRefs = React.useRef({} as { [key: string]: any })

  return (
    <>
      <SEO title="Cowork" description="Coworking at Devconnect" />
      <Hero
        className={css['cowork-hero']}
        imageProps={{ src: CoworkHero, alt: 'Coworking space' }}
        backgroundTitle="Co/work"
      >
        <div className={css['content']}>
          <div>
            <p className="uppercase extra-large-text bold secondary title">CoWork —</p>

            <p className={`${css['info']} uppercase big-text`}>
              <Link href="https://www.google.com/maps?ll=52.375062,4.896171&z=16&t=m&hl=en&gl=DK&mapclient=embed&cid=18286565975988533039">
                <u>Beurs Van Berlage (BVB)</u>
              </Link>{' '}
              📍
              <br />
              <span className="large-text">APRIL 18th — 25th</span>
              <br />
              every day 09:00 AM - 11:00 PM
            </p>
          </div>

          <div className={css['call-to-action']}>
            <AnchorLink href="#ticketing" offset="32" className={`button orange`}>
              <TicketIcon />
              Tickets
            </AnchorLink>

            <a
              href="https://goo.gl/maps/279RVpXu5jpCYtAU9"
              target="_blank"
              rel="noreferrer"
              className={`button orange`}
            >
              <PinIcon />
              Directions
            </a>
          </div>
        </div>
      </Hero>

      <div className={css['cowork']}>
        <div className={`section fade-in-up`}>
          <div className="clear">
            <div className="border-bottom" id="general-info">
              <Tabs
                tabs={[
                  {
                    text: 'General info',
                    value: 'general-info',
                  },
                  {
                    text: 'Ticketing',
                    value: 'ticketing',
                  },
                ]}
              />
            </div>
          </div>

          <div className={`${css['ticketing-alert']} clear-vertical`}>
            <Alert title="Ticket Information" color="orange">
              <b>
                Coworking tickets will only grant you access to the Cowork Space at the Beurs van Berlage venue in
                Amsterdam.
              </b>
              <br />
              These tickets will NOT grant access to any other events taking place during Devconnect.
            </Alert>
          </div>

          <div className="clear-vertical">
            <div className={`${css['body']}`}>
              <div className={css['left']}>
                <p className={`uppercase bold large-text ${css['title']}`}>Coworking</p>
                <p className={`uppercase bold`}>Devconnect</p>
                <p className="big-text">
                  As part of our goal to foster <b>collaboration and community</b> throughout Devconnect week, we will
                  be hosting a co-work space for all those coming to Amsterdam to use as a meeting point, a place to
                  work, and a space to relax.
                </p>
                <p>
                  While all of the other events happening throughout the week will be independently-organized, this
                  co-work space will be officially hosted by the <b>Devconnect</b> team.
                </p>
              </div>

              <div className={`${css['right']}`}>
                <div className={css['what-to-expect']}>
                  <p className={`big-text bold uppercase ${css['title']}`}>What to expect?</p>
                  <p>
                    <b>Work.</b> Tables, wifi, and outlets.
                  </p>

                  <p>
                    <b>Relax.</b> Comfy areas to relax alone or in a small group.
                  </p>
                  <p>
                    <b>Collaborate.</b> Several meeting rooms available for informal meetings (first come first serve).
                  </p>

                  <p>
                    <b>Energize.</b> Light snacks and drinks will be offered throughout.
                  </p>
                </div>

                <div className={`${css['how-to-attend']} border-top`}>
                  <p className={`big-text bold uppercase ${css['title']}`}>How to Attend?</p>

                  <p className={`bold`}>
                    While ticketing for all other events during Devconnect is left up to their respective organizers,
                    tickets to the co-work are open to all Devconnect attendees looking to work together and hang out
                    between sessions, so come meet with old and new friends alike. More details below.
                  </p>

                  <br />

                  <AnchorLink href="#ticketing" offset="32" className="button sm orange-fill">
                    Ticket information
                  </AnchorLink>
                </div>
              </div>
            </div>
          </div>

          <div className={`clear`}>
            <div className={`${css['gallery']}`}>
              <div className={css['grid-item']}>
                <Image src={Cowork1} alt="Cowork space example" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork2} alt="Cowork space example" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork3} alt="Cowork space example" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork4} alt="Cowork space example" />
              </div>
              <div className={css['grid-item']}>
                <Image src={Cowork5} alt="Cowork space example" />
              </div>
            </div>
          </div>

          <div className="clear-vertical">
            <div className={`${css['ticketing']}`} id="ticketing">
              <p className={`uppercase bold large-text ${css['title']}`}>Ticketing information</p>

              <div className={css['disclaimer']}>
                <p>
                  All events during Devconnect are independently hosted and it is their choice how they do ticketing:
                  open ticket sales, applications, pre-defined list of attendees, etc.
                </p>
                <p>
                  For information on attending the independently-hosted events during the week of Devconnect, see
                  our&nbsp;
                  <Link href="schedule">schedule</Link> and find the event you are interested in attending.
                </p>
              </div>

              <div className={css['hours-open']}>
                <p className={`uppercase bold big-text`}>Venue</p>
                <p>
                  The Co-work Space will be open from: <b>April 18-25th, 2022 09:00 - 23:00.</b>
                </p>
                <p>
                  In an effort to ensure maximum availability of the co-work space to the Ethereum community, we will be
                  over-distributing tickets. In other words, the total number of tickets we distribute will exceed the
                  max capacity of the co-work space at one time.
                  <br />
                  Therefore, entry to the co-work space will be granted on a first-come first-serve basis. In the event
                  that the venue is at full-capacity, even those with a wristband may be denied entry until space
                  becomes available
                  <br />
                  From April 22-24th, ETHGlobal will be hosting a Hackathon within the Beurs van Berlage venue, and
                  therefore we will have more limited capacity on these days.
                </p>
              </div>

              <div className={css['covid-policy']}>
                <p className={`uppercase bold big-text`}>Covid-19 Policy</p>
                <p>
                  COVID-19 regulations are constantly changing around the world. We will be following the COVID-19
                  policy of the Netherlands and the Beurs van Berlage venue during the week of Devconnect.
                </p>
                <p>
                  <b>
                    This may include verifying IDs to match any required proof of negative test or COVID-19 Vaccination,
                    if they are required to enter the venue at the time of the event.
                  </b>
                </p>
              </div>

              <div className={css['registration']}>
                <p className={`uppercase bold big-text`}>Registration</p>
                <p>
                  If you purchase a ticket, a QR-code will be emailed to you 3 days before the event, and you may use
                  that to check-in.
                </p>
                <p>
                  Depending on the Netherlands&apos; COVID measures at the time of the event, you may be required to
                  show proof of COVID-19 vaccination or a negative test from 48-72 hours prior to check-in. This will
                  also need to be cross-checked with a matching ID, so please bring matching ID in the event we have to
                  screen for COVID-19 measures.
                </p>
                <p>
                  When your ticket is scanned &amp; approved, you will be given a wristband. This wristband is how you
                  will access the Co-work Space for the full week, so we advise that you wear it immediately upon
                  receipt &amp; do not lose or remove the wristband unless you no longer plan on attending the Co-work
                  Space.
                </p>
                <p>If you lose your wristband, you will not be granted re-entry to the venue.</p>
                <p>
                  <b>Once you&apos;re checked in, head over to our Swag Desk to snag some sweet Devconnect swag!</b>
                </p>
              </div>

              <div className={css['how-to-buy']}>
                <p className={`uppercase bold big-text`}>How can I buy a ticket?</p>
                <p>
                  Tickets will be on sale in waves, to be communicated via our{' '}
                  <Link indicateExternal href="https://twitter.com/efdevconnect">
                    twitter
                  </Link>
                </p>
                <p>
                  We will accept fiat payments via Stripe and ETH &amp; DAI payments via two L2s: Optimism and Arbitrum.
                  To keep costs low for everyone, we will only be accepting payments on L2s.{' '}
                </p>
                <br />
                <Link indicateExternal href="https://ticketh.xyz/devconnect/cowork/" className="button sm orange-fill">
                  Get tickets
                </Link>
              </div>
            </div>
          </div>

          {/* <div className={`${css['ticketing']} clear`} id="ticketing">
            <Accordion>
              <AccordionItem
                title="Ticketing information"
                id="ticketing"
                ref={el => (accordionRefs.current['ticketing'] = el)}
              >
                <div className={css['disclaimer']}>
                  <p>
                    These tickets will{' '}
                    <b>only grant you access to the EF-hosted Coworking Space at the Beurs van Berlage venue</b> in
                    Amsterdam.
                  </p>
                  <p>
                    These tickets will <b>NOT</b> grant access to <b>ANY</b> other events taking place during
                    Devconnect.
                  </p>
                  <p>
                    All events during Devconnect are independently hosted and it is their choice how they do ticketing:
                    open ticket sales, applications, pre-defined list of attendees, etc.
                  </p>
                  <p>
                    For information on attending the independently-hosted events during the week of Devconnect, see
                    our&nbsp;
                    <Link href="schedule">schedule</Link> and find the event you are interested in attending.
                  </p>
                </div>

                <div className={css['hours-open']}>
                  <p className={`uppercase bold big-text`}>Hours open</p>
                  <p>
                    The Co-working Space will be open from: <b>April 18-25th, 2022 09:00 - 23:00.</b>
                  </p>
                  <p>
                    <b>
                      Entry to the co-working space will be first-come first-serve. You may be denied entry if the space
                      is full, even if you have a ticket.
                    </b>
                  </p>
                  <p>
                    Beurs van Berlage does have limited capacity. In cases of limited capacity, entry will be granted on
                    a first-come first-serve basis, even if you have already checked in &amp; have a wristband.
                  </p>
                  <p>
                    From April 22-24th, ETHGlobal will be hosting a Hackathon within the Beurs van Berlage venue, and
                    therefore we will have more limited capacity on these days.{' '}
                  </p>
                </div>

                <div className={css['covid-policy']}>
                  <p className={`uppercase bold big-text`}>Covid-19 Policy</p>
                  <p>
                    COVID-19 regulations are constantly changing around the world. We will be following the COVID-19
                    policy of the Netherlands and the Beurs van Berlage venue during the week of Devconnect.
                  </p>
                  <p>
                    <b>
                      This may include verifying IDs to match any required proof of negative test or COVID-19
                      Vaccination, if they are required to enter the venue at the time of the event.
                    </b>
                  </p>
                </div>

                <div className={css['registration']}>
                  <p className={`uppercase bold big-text`}>Registration</p>
                  <p>If you purchase a ticket, a QR-code will be emailed to you and you may use that to check-in.</p>
                  <p>
                    Depending on the Netherlands’ COVID measures at the time of the event, you may be required to show
                    proof of COVID-19 vaccination or a negative test from 48-72 hours prior to check-in. This will also
                    need to be cross-checked with a matching ID, so please bring matching ID in the event we have to
                    screen for COVID-19 measures.
                  </p>
                  <p>
                    When your ticket is scanned &amp; approved, you will be given a wristband. This wristband is how you
                    will access the Co-working Space for the full week, so we advise that you wear it immediately upon
                    receipt &amp; do not lose or remove the wristband unless you no longer plan on attending the
                    Co-working Space.
                  </p>
                  <p>If you lose your wristband, you will not be granted re-entry to the venue.</p>
                  <p>Once you’re checked in, head over to our Swag Desk to pick up the Swag you have ordered!</p>
                </div>

                <div className={css['how-to-buy']}>
                  <p className={`uppercase bold big-text`}>How can I buy a ticket?</p>
                  <p>Tickets will go on sale at 17:00 CET on Feb. x, 2022.</p>
                  <p>
                    We will accept fiat payments via Stripe and ETH &amp; DAI payments via two L2s: Optimism and
                    Arbitrum. To keep costs low for everyone, we will only be accepting payments on L2s.{' '}
                  </p>
                  <p>Head on over to ticketh.xyz/devconnect/cowork to secure your ticket!</p>
                  <br />
                  <button className="button sm orange-fill">Get tickets</button>
                </div>
              </AccordionItem>
            </Accordion>
          </div> */}
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
