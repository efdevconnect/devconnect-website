import { NextPage } from 'next'
import React from 'react'
import { Footer } from './index'
import Hero from 'common/components/hero'
// import AmsterdamHero from 'assets/images/amsterdam-hero.jpg'
import HeroImage from 'assets/images/city-guide/city-guide.png'
import AreasToStayCityCenter from 'assets/images/city-guide/city-center.png'
import AreasToStayEast from 'assets/images/city-guide/east.png'
import AreasToStaySouth from 'assets/images/city-guide/south.png'
import AreasToStayWest from 'assets/images/city-guide/west.png'
import Image from 'next/legacy/image'
import css from './city-guide.module.scss'
import { SEO } from 'common/components/SEO'
import SwipeToScroll from 'common/components/swipe-to-scroll'
import Visa from 'assets/icons/visa.svg'
import Clock from 'assets/icons/clock.svg'
import Globe from 'assets/icons/globe.svg'
import PinIcon from 'assets/icons/pin.svg'
import Dollar from 'assets/icons/dollar.svg'
import Water from 'assets/icons/water.svg'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Link, { useDraggableLink } from 'common/components/link'
import Accordion, { AccordionItem } from 'common/components/accordion'

const tabs = [
  {
    text: 'General info',
    value: 'general-info',
  },
  {
    text: 'Plan Your Travels',
    value: 'plan-your-travels',
    content: () => {
      return (
        <div className={`tab-content small-text ${css['plan-your-travels']}`}>
          <p>
            <strong>Timezone</strong>: GMT+3 (All the year, as Turkey has no daylight savings time.)
          </p>
          <p>
            <strong>Visa requirements</strong>: Get your Visa before your travels! Most visitors require an{' '}
            <a href="https://www.evisa.gov.tr/en/">e-Visa</a>. Visitors from some countries can{' '}
            <a href="https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa">stay with a tourist visa</a>.{' '}
          </p>
          <p>
            <strong>Need a Visa invitation letter?</strong> Write us at support@devcon.org (you&apos;ll need to purchase{' '}
            <a href="devconnect.org/cowork">Devconnect Cowork</a> ticket first)
          </p>
          <p>
            <strong>Airports</strong>: Istanbul International Airport (IST) (European side) Sabiha Gökçen Airport (Asian
            side)
          </p>
          <p>
            <strong>Official language</strong>: Turkish Thank you ={' '}
            <Link href="https://forvo.com/word/te%C5%9Fekk%C3%BCr_ederim/">Teşekkür ederim</Link>, GM = GA (Günaydın)
          </p>
          <p>
            <strong>E-SIM providers</strong>: Holafly or Airalo{' '}
          </p>
          <p>
            <strong>SIM cards with best 4G coverage:</strong> Turkcell or Türk Telekom We recommend buying physical SIM
            cards in a local shop, not at the airport.
          </p>
          <p>
            <strong>Average November weather</strong>: High: 15ºC (59 ºF), Low: 9ºC (47ºF)
          </p>
        </div>
      )
    },
  },
  //   {
  //     text: 'Plan Your Travels',
  //     value: 'airport-transit',
  //     content: () => {
  //       return (
  //         <div className={`tab-content small-text ${css['airport-transit']}`}>
  //           <p className={`header small-text bold`}>Ride Sharing</p>
  //           <p className="small-text">
  //             You can easily Uber or Bolt into Amsterdam or to the Airport. Schiphol Airport is not too far from the City
  //             Center.
  //           </p>

  //           <p className={`header small-text bold`}>Metro</p>
  //           <Link
  //             href="https://www.amsterdam.info/transport/metro/"
  //             indicateExternal
  //             style={{ display: 'inline-flex' }}
  //             className="small-text hover-underline"
  //           >
  //             <p>View Metro Routes</p>
  //           </Link>

  //           <br />
  //           <br />
  //           <p className="small-text">
  //             The Metro will likely have a stop close to your accommodation. <br />
  //             There is a direct metro to Centraal (main station) which also then has access to many more metro and tram
  //             stops. After midnight, trains from Schiphol Airport to Centraal Station run hourly rather than every 10-15
  //             minutes, a taxi, Uber, or Bolt will be your best option.
  //           </p>
  //         </div>
  //       )
  //     },
  //   },
  {
    text: 'Where to stay',
    value: 'where-to-stay',
    content: () => {
      return (
        <div className={`tab-content small-text ${css['getting-around']}`}>
          <p>
            The Bosporus Strait divides Istanbul&apos;s neighborhoods into two sides: the European side and the Asian
            side. The Devconnect Cowork venue and probably most Devconnect venues will be located on the European side.
            We recommend staying around the green metro line.
          </p>
          <h3 id="here-are-the-neighborhoods-we-recommend-staying-in-">
            Here are the neighborhoods we recommend staying in:
          </h3>
          <p>
            <strong>Nişantaşı/Maçka and Osmanbey</strong>: The Devconnect Cowork is right between these two
            neighborhoods! They are considered central, and elegant districts. Taksim and Osmanbey stations are both
            approximately a 7-minute walking distance from the ICC.
          </p>
          <p>
            <strong>Şişli:</strong> You can reach the ICC venue by walking from many areas in Şişli.
          </p>
          <p>
            <strong>Beyoğlu</strong>: You can reach Beyoğlu via public transport in about 20 minutes. In the
            neighborhood, you find the famous Taksim Square and Istiklal Street, known for their nightlife, and
            restaurant options.
          </p>
          <p>
            <strong>Karaköy/Galata</strong>: Trendy neighborhood, known for its art galleries, boutiques, and cafes. It
            takes about 15-20 minutes by public transport to the ICC.{' '}
          </p>
          <p>
            <strong>Beşiktaş</strong>: A hipster neighborhood close to the Bosphorus, filled with bars, cafes,
            restaurants, and a large student population. It takes 15-20 minutes by public transport from Beşiktaş Meydan
            to the ICC venue.{' '}
          </p>
          <p>
            <strong>Üsküdar</strong> is a good and affordable alternative on the Asian side, very local with few
            tourists. The frequent ferries allow easy access to the European side with a 10-minute ride to Beşiktaş and
            a ~40 minutes metro connection under the sea to the historical peninsula. Ferries are operating until late.{' '}
          </p>
          <p>
            <strong>The Historic Peninsula:</strong> The touristic center, including the neighborhood{' '}
            <strong>Sultanahmet</strong> with many famous landmarks like the Blue Mosque, Hagia Sophia, Topkapi Palace,
            and the Grand Bazaar, all within walking distance of each other. Check out{' '}
            <Link href="https://istanbulclues.com/istanbul-historic-peninsula/" indicateExternal>
              this resource
            </Link>{' '}
            for a map and more details.{' '}
          </p>
          <h3 id="far-but-nice-">Far but nice:</h3>
          <p>
            <strong>Moda in Kadıköy</strong> is one of the most beautiful, hip, and modern districts. It has a lovely
            coast, many good restaurants, cafes and bars. The district attracts most students and upper-middle-class
            young adults. However, Kadıköy is far from the venue, requiring a ~1-hour ride with public transport. It
            might be a good place to stay for a local experience outside Devconnect week.{' '}
          </p>
          <p>
            <strong>More information about all neighborhoods:</strong>
          </p>
          <p>
            <Link href="https://propertyexperts-tr.com/en/Blog/districts-of-istanbul" indicateExternal>
              https://propertyexperts-tr.com/en/Blog/districts-of-istanbul
            </Link>
          </p>
          <p>
            <Link href="https://exploretraveloasis.com/the-coolest-neighbourhoods-in-istanbul/" indicateExternal>
              https://exploretraveloasis.com/the-coolest-neighbourhoods-in-istanbul/
            </Link>
          </p>
          <p>
            <Link
              href="https://www.isthomes.com/news/best-5-areas-to-live-on-the-asian-side-of-istanbul"
              indicateExternal
            >
              https://www.isthomes.com/news/best-5-areas-to-live-on-the-asian-side-of-istanbul
            </Link>
          </p>
        </div>
      )
    },
  },
  {
    text: 'Experience the City',
    value: 'experience-the-city',
    content: () => {
      return (
        <div className={`tab-content small-text ${css['experience-the-city']}`}>
          <p>
            Istanbul&#39;s magic lies in the narrow lanes of its bazaars, the calls to prayer, the cats strolling
            around, the rhythms of Turkish music, and, of course, the delicious food. Istanbul is considered a
            cat&apos;s heaven - locals take good care of their strays, giving them food and shelter -, and a
            foodie&apos;s paradise - Turkish cuisine is meat-heavy, but vegetables play a significant role as well, and
            for the foodies amongst you,{' '}
            <Link indicateExternal href="https://twitter.com/kaanuzdogan/status/1684913443759968256?s=20">
              here is a restaurant guide
            </Link>{' '}
            put together by a local community member.{' '}
          </p>
          <p>
            There is an active and vibrant local Ethereum community in Istanbul, and they are excited to welcome
            Devconnect attendees to their city. Many shared small videos with us, showing what Istanbul has to offer.
            Watch the videos, and experience Istanbul&apos;s magic! ✨
          </p>
        </div>
      )
    },
  },
  {
    text: "Istanbul's History and Culture",
    value: 'history-and-culture',
    content: () => {
      return (
        <div className={`tab-content small-text ${css['history-and-culture']}`}>
          <div
            className="margin-bottom"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', maxWidth: '700px' }}
          >
            <div className="aspect">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BzMYQIo-0NA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <p>
            Istanbul lies in a geographically unique spot, being the only city that covers two continents - Europe and
            Asia. Istanbul is not only a fusion of continents, it&apos;s also a unique blend of cultures. Ancient
            histories intertwine with the modern world, and many civilizations have left their imprints over the
            millennia.{' '}
          </p>
          <p>
            Alone the different names Istanbul has been called give you a sense of the variety of cultures you can
            experience in the city. Initially founded by Greek settlers in the 7th century BC, it was known as{' '}
            <Link indicateExternal href="https://ethereum.org/en/history/#byzantium">
              Byzantium
            </Link>
            . The city later came under Roman rule and was renamed{' '}
            <Link indicateExternal href="https://ethereum.org/en/history/#constantinople">
              Constantinople
            </Link>{' '}
            by the Roman Emperor Constantine the Great. It wasn&#39;t until the 1930s that the city was officially named{' '}
            <Link indicateExternal href="https://ethereum.org/en/history/#istanbul">
              Istanbul
            </Link>
            .{' '}
          </p>
          <p>
            If you want to delve deeper into understanding Istanbul&apos;s culture, you can get started with some of the
            following movie and book recommendations from a local.{' '}
          </p>
          <ul>
            <li>
              <p>Books:</p>

              <ul>
                <li className="margin-bottom-less">
                  <p> John Freely&apos;s Istanbul - John Freely</p>
                  <p>
                    John Freely is an American Academician who has lived in Istanbul for many years and is a lover of
                    Istanbul. In this book, he describes Istanbul in a very detailed and easy-to-read manner.
                    Istanbulites, who love Freely very much, named the Boğaziçi University Western Languages Faculty
                    building after John Freely.
                  </p>
                </li>
                <li className="margin-bottom-less">
                  <p>My Name Is Red - Orhan Pamuk</p>
                  <p>
                    Orhan Pamuk is a Nobel Prize winner author who was raised in Istanbul. All of his books are related
                    to Istanbul. If you are interested in Postmodernism in Literature, you can find no better narrative
                    builder than Pamuk. You can also read &quot;Snow&quot;, and &quot;The Museum of Innocence&quot; from
                    Pamuk.
                  </p>
                </li>
                <li className="margin-bottom-less">
                  <p>Murder on the Orient Express - Agatha Christie</p>
                  <p>Do you like detective novels? Agatha Christie&#39;s work can help you get to know Istanbul.</p>
                </li>
                <li className="margin-bottom-less">
                  <p>Peace - Ahmet Hamdi Tanpınar</p>
                  If you are a true bookworm and would like to learn both the Turkish way of life and Istanbul in fine
                  detail and with a poetic-masterfully written novel, Tanpınar will be the best choice for you. It is
                  THE masterpiece.
                </li>
              </ul>
            </li>
            <li>
              <p>Movies:</p>

              <ul>
                <li className="margin-bottom-less">
                  <p>
                    Distant - 2002 - Nuri Bilge Ceylan
                    <p>
                      You can see the Historical European Quarter of Istanbul in this film. Distant won Palme d&apos;Or
                      and Gran Prize of the Jury, Best Actor prizes from the Cannes Film Festival.
                    </p>
                  </p>
                </li>
                <li className="margin-bottom-less">
                  <p> From Russia With Love- 1963 - James Bond</p>
                  <p>
                    In this film, you can see the legendary “Orient Express” Train line that connects Paris to Istanbul.
                  </p>
                </li>
                <li className="margin-bottom-less">
                  <p>Skyfall - 2012- James Bond</p>
                  <p>
                    People can see some of the most iconic places of Istanbul such as Grand Bazaar and Eminönü and
                    Bosphorus in this Film.
                  </p>
                  <p>If you want to go even deeper, there are lots of films and series on Netflix about Istanbul.</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )
    },
  },
  //   {
  //     text: 'Areas to stay',
  //     value: 'areas-to-stay',
  //     content: () => {
  //       return (
  //         <div className={`tab-content small-text ${css['areas-to-stay']}`}>
  //           <div className={`columns-2`}>
  //             <div>
  //               <p className={`header small-text`}>City Center</p>
  //               <p className="bold">Areas: Old Center, Canal rings, Red light district (can be noisy)</p>

  //               <ul className={css['list']}>
  //                 <li>Very lively and has the “Amsterdam energy”</li>
  //                 <li>Beautiful old buildings and history</li>
  //                 <li>Accessible to popular and event-related areas</li>
  //                 <li>Walkable to almost everything you&apos;d like to experience</li>
  //               </ul>
  //             </div>
  //             <div className={css['image']}>
  //               <Image src={AreasToStayCityCenter} alt="City center" layout="fill" objectFit="cover" priority />
  //             </div>
  //           </div>
  //           <div className={`divider`}></div>
  //           <div className={`columns-2`}>
  //             <div>
  //               <p className={`header small-text`}>East</p>
  //               <p className="bold">Areas: Eastern Docklands, Plantage</p>

  //               <ul className={css['list']}>
  //                 <li>Maritime heritage, with fantastic views over the water</li>
  //                 <li>Lots of green, botanical gardens and historical buildings</li>
  //                 <li>
  //                   Most ethnically diverse, traditional Turkish bakeries, Surinamese supermarkets and Middle Eastern
  //                   lunchrooms
  //                 </li>
  //               </ul>
  //             </div>
  //             <div className={css['image']}>
  //               <Image src={AreasToStayEast} alt="East area" layout="fill" objectFit="cover" priority />
  //             </div>
  //           </div>
  //           <div className={`divider`}></div>
  //           <div className={`columns-2`}>
  //             <div>
  //               <p className={`header small-text bold`}>South</p>
  //               <p className="bold">Areas: De Pijp, Oud Zuid</p>

  //               <ul className={css['list']}>
  //                 <li>Lively area, with a hip and younger international crowd</li>
  //                 <li>Lots of restaurants and bars and places to hang out</li>
  //                 <li>Oud Zuid is more elegant and close to the museum district</li>
  //               </ul>
  //             </div>
  //             <div className={css['image']}>
  //               <Image src={AreasToStaySouth} alt="South area" layout="fill" objectFit="cover" priority />
  //             </div>
  //           </div>
  //           <div className={`divider`}></div>
  //           <div className={`columns-2`}>
  //             <div>
  //               <p className={`header small-text bold`}>West</p>
  //               <p className="bold">Areas: Oud West, Westerpark</p>

  //               <ul className={css['list']}>
  //                 <li>
  //                   Close to the biggest parks Vondel Park and Westerpark, which combines expansive greenery with
  //                   industrial venues (Food Hallen, Westergas)
  //                 </li>
  //                 <li>
  //                   Cool spot to eat and drink&nbsp;(
  //                   <Link href="https://foodhallen.nl/" indicateExternal className="small-text hover-underline">
  //                     Food Hallen
  //                   </Link>
  //                   )
  //                 </li>
  //                 <li>Explore the varied mix of local hotspots in the Westerpark</li>
  //               </ul>
  //             </div>
  //             <div className={css['image']}>
  //               <Image src={AreasToStayWest} alt="West area" layout="fill" objectFit="cover" priority />
  //             </div>
  //           </div>
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     text: 'Food and Drink',
  //     value: 'food-and-drink',
  //     content: () => {
  //       return (
  //         <div className={`tab-content small-text ${css['food-and-drink']}`}>
  //           <p className={`header small-text bold`}>General food and drink</p>
  //           <p className="bold">
  //             There are so many options for eating and drinking in Amsterdam, especially in the City Center — it&apos;s
  //             hard to name just a few!
  //           </p>
  //           <p className="medium-text underline">Best apple pie</p>
  //           <ul>
  //             <li className="bold">Winkel34</li>
  //           </ul>
  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Popular items to eat</p>
  //           <ul>
  //             <li>Poffertjes</li>
  //             <li>Stroopwafel</li>
  //             <li>Kibbeling</li>
  //             <li>Dutch Cheeses</li>
  //             <li>Pannekoeken</li>
  //           </ul>
  //           <div className={`divider`}></div>
  //           <p className="bold">Brown Bars and Wine Bars are in abundance.</p>
  //           <p>Eating Borrel is super popular at these bars</p>
  //           <ul>
  //             <li>Bitterballen</li>
  //             <li>Kroket</li>
  //             <li>Friet (fries)</li>
  //           </ul>

  //           <div className={`divider`}></div>
  //           <p className="bold">Amsterdam based breweries</p>
  //           <ul>
  //             <li>
  //               <Link href="https://goo.gl/maps/HZJQwV47YgXdSTt3A" indicateExternal>
  //                 Brouwerij t IJ
  //               </Link>
  //             </li>
  //             <li>Oedipus</li>
  //             <li>Troost</li>
  //           </ul>
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     text: 'Things to try',
  //     value: 'things-to-try',
  //     content: () => {
  //       return (
  //         <div className={`tab-content small-text ${css['food-and-drink']}`}>
  //           <p className={`header small-text bold`}>Activities</p>
  //           <ul>
  //             <li className="bold">Take a Canal Cruise</li>
  //             <li>
  //               <span className="bold">Biking</span>
  //               <ul>
  //                 <li>
  //                   Whether in the city limits or a long bike ride outside the city, Amsterdam has great and safe
  //                   infrastructure for cyclists.
  //                 </li>
  //               </ul>
  //             </li>
  //             <li>
  //               <span className="bold">Visit the Dutch Cheese Shops</span>
  //               <ul>
  //                 <li>There are TONS in Centraal</li>
  //               </ul>
  //             </li>
  //             <li className="bold">Coffee Shops (Not Cafes): DYOR 🙃</li>
  //             <li className="bold">Red Light District is an interesting and historical part of Amsterdam</li>
  //           </ul>

  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Museums</p>
  //           <p>A lot of museums are located near each other at Museum square</p>
  //           <ul>
  //             <li>Rijksmuseum</li>
  //             <li>Van Gogh museum</li>
  //             <li>Stedelijk museum </li>
  //             <li>MOCO museum</li>
  //             <li>Heineken Experience</li>
  //             <li>Anne Frank Museum</li>
  //             <li>Straat museum (street art)</li>
  //             <li>Nxt museum</li>
  //           </ul>
  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Parks</p>
  //           <p>Main shopping districts is at the Kalverstraat and Leidsestraat</p>
  //           <ul>
  //             <li>Vondel Park (most popular and accessible)</li>
  //             <li>Westerpark </li>
  //             <li>Oosterpark</li>
  //             <li>Rembrandt Park</li>
  //             <li>Sarphatipark, a nice smaller park in De Pijp</li>
  //           </ul>
  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Markets</p>
  //           <ul>
  //             <li>
  //               <Link href="https://albertcuyp-markt.amsterdam/?lang=en" indicateExternal>
  //                 Albert Cuyp Market
  //               </Link>
  //             </li>
  //             <li>Waterloopplein</li>
  //             <li>
  //               <Link href="https://noordermarkt-amsterdam.nl/" indicateExternal>
  //                 Noordermarkt
  //               </Link>
  //             </li>
  //             <li>Ten Kate market</li>
  //           </ul>
  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Shopping</p>
  //           <p>Main shopping districts is at the Kalverstraat and Leidsestraat</p>
  //           <ul>
  //             <li>Located between Leidsestraat and the canals you can find the nine streets (negen straatjes)</li>
  //             <li>The big, well known department stores are the Bijenkort and Magna Plaza</li>
  //             <li>PC Hooftstraat is Amsterdam&apos;s most exclusive shopping street </li>
  //           </ul>
  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Explore Amsterdam North</p>
  //           <p>Take a free ferry ride across the river (IJ). Ferries leave from behind Central Station </p>
  //           <ul>
  //             <li>
  //               Go to Buiksloterweg to visit the A&apos;DAM tower, EYE movie museum, swing over the edge of the rooftop
  //               bar or chill at the garden of Tolhuistuin.
  //               <ul>
  //                 <li>
  //                   Places to visit in the area: Nxt museum, Cafe de Ceuvel, Oedipus Brewery, Skatecafe, FC Hyena, Hangar
  //                 </li>
  //                 <li> Walk or bike along the river and take the ferry back from NDSM </li>
  //               </ul>
  //             </li>
  //             <li>
  //               Go to NDSM to visit the old shipwharf, one of the most artistic areas of Amsterdam
  //               <ul>
  //                 <li>
  //                   Places to visit in the area: STRAAT museum (street art), Anne Frank mural painting, NDSM (wharf /
  //                   warehouse), Nxt museum, Ijver, Noorderlight or relax at the mini-beach of Pllek
  //                 </li>
  //                 <li> Walk or bike along the river and take the ferry back from Buiksloterweg</li>
  //               </ul>
  //             </li>
  //           </ul>
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     text: 'General tips',
  //     value: 'general-tips',
  //     content: () => {
  //       return (
  //         <div className={`tab-content small-text ${css['general-tips']}`}>
  //           <p className={`header small-text bold`}>General</p>
  //           <p className="bold underline">Places do not open very early in the mornings in Amsterdam</p>
  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Attractions</p>
  //           <p className={`${css['no-clearance']} bold`}>
  //             Pre-purchase tickets where possible for museums and popular places to visit
  //           </p>
  //           <ul className={css['indent']}>
  //             <li>This is to avoid long queues – especially building into the high season (June to August)</li>
  //           </ul>
  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Restaurants</p>
  //           <p className={`${css['no-clearance']} bold`}> Book restaurants in advance</p>
  //           <ul className={css['indent']}>
  //             <li>They get booked up and packed very quickly, so it&apos;s best to book to avoid disappointment</li>
  //           </ul>

  //           <div className={`divider`}></div>
  //           <p className={`header small-text bold`}>Biking / Cyclists</p>
  //           <p className={`${css['no-clearance']}`}>Bike Rentals</p>
  //           <p className={`${css['no-clearance']} bold`}>
  //             If you are renting a bike, please be very mindful of locking it securely (bikes do get stolen)
  //           </p>
  //           <ul className={css['indent']}>
  //             <li>Also be VERY MINDFUL of where you park your bike</li>
  //             <li>
  //               You can&apos;t just park it anywhere on the street, it will be removed by the Gemeente (Amsterdam
  //               municipality) if placed incorrectly.
  //             </li>
  //           </ul>
  //           <br />
  //           <p className={`${css['no-clearance']}`}>Cyclists</p>
  //           <p className={`${css['no-clearance']} bold`}>Mind the cyclists – and cycling lanes</p>
  //           <ul className={css['indent']}>
  //             <li>You will annoy cyclists if you are in the lanes</li>
  //             <li>And will probably just get knocked over by the incoming bikes.</li>
  //           </ul>
  //         </div>
  //       )
  //     },
  //   },
]

export const Tabs = (props: any) => {
  const linkAttributes = useDraggableLink()

  return (
    <SwipeToScroll>
      <div className={css['tabs']}>
        {props.tabs.map((tab: any, index: number) => {
          let className = `uppercase ${css['tab']}`

          const toggled = index === 0

          if (toggled) className += ` ${css['always-toggled']} bold`

          return (
            <AnchorLink
              key={tab.value}
              href={`#${tab.value}`}
              className={className}
              {...linkAttributes}
              onClick={(e: any) => {
                if (props.accordionRefs && props.accordionRefs.current[tab.value]) {
                  props.accordionRefs.current[tab.value].open()
                }

                linkAttributes.onClick(e)
              }}
            >
              {tab.text}
            </AnchorLink>
          )
        })}
      </div>
    </SwipeToScroll>
  )
}

const List = (props: any) => {
  return (
    <div className={css['list']}>
      <div className={css['row']}>
        <div className={`${css['left']} uppercase`}>
          <Clock className={`${css['icon']} icon`} />
          <p className={`bold`}>Timezone: &nbsp;</p>
          <p>GMT+3</p>
        </div>
        <Link
          href="https://www.timeanddate.com/worldclock/turkey/istanbul"
          className={`${css['right']} orange uppercase tiny-text hover-underline`}
        >
          Current time
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} uppercase`}>
          <Visa className={`${css['icon']} icon`} />
          <p>
            <b>Visa:</b> tourist visa (30/90 days) & e-vsa
          </p>
        </div>
        <AnchorLink
          href={`#plan-your-travels`}
          className={`${css['right']} orange uppercase tiny-text hover-underline generic`}
          onClick={(e: any) => {
            if (props.accordionRefs.current['plan-your-travels']) {
              props.accordionRefs.current['plan-your-travels'].open()
            }
          }}
        >
          Requirements
        </AnchorLink>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} uppercase`}>
          <Dollar className={`${css['icon']} icon`} />
          <p>
            <b>Currency:</b> Turkish Lira (€ EUR)
          </p>
        </div>
        <Link
          href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=TRY"
          className={`${css['right']} orange uppercase tiny-text hover-underline`}
        >
          Exchange Rate
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} uppercase`}>
          <Globe className={`${css['icon']} icon`} />
          <p className="bold">Official language:&nbsp;</p>
          <p> Turkish </p>
        </div>
        <Link
          href="https://www.iamsterdam.com/en/about-amsterdam/amsterdam-information/history-and-society/language"
          className={`${css['right']} orange uppercase tiny-text hover-underline`}
        >
          Language Guide
        </Link>
      </div>
      <div className={css['row']}>
        <div className={`${css['left']} uppercase`}>
          <Water className={`${css['icon']} icon`} />
          <p className="bold">WATER: &nbsp;</p>
          <p>Medium safe to drink</p>
        </div>
        <AnchorLink
          href={`#faq`}
          className={`${css['right']} orange uppercase tiny-text hover-underline generic`}
          onClick={(e: any) => {
            if (props.accordionRefs.current.faq) {
              props.accordionRefs.current.faq.open()
            }
          }}
        >
          FAQ
        </AnchorLink>
      </div>
    </div>
  )
}

const CityGuide: NextPage = () => {
  const accordionRefs = React.useRef({} as { [key: string]: any })

  return (
    <>
      <SEO title="City Guide" description="Devconnect city guide" />
      <Hero
        className={css['city-guide-hero']}
        backgroundClassName={css['background']}
        backgroundTitle="Cityguide"
        backgroundStyle="fill"
        imageProps={{ src: HeroImage, alt: 'Amsterdam' }}
      >
        <div className={css['hero-content']}>
          <p className="uppercase extra-large-text bold secondary title">BYTE & BITE GUIDE —</p>

          <div className={css['items']}>
            {tabs.map(tab => {
              return (
                <AnchorLink
                  key={tab.value}
                  href={`#${tab.value}`}
                  className={`uppercase bold`}
                  onClick={() => accordionRefs.current[tab.value] && accordionRefs.current[tab.value].open()}
                >
                  {tab.text}
                </AnchorLink>
              )
            })}
          </div>
        </div>
      </Hero>

      <div className={css['city-guide']}>
        <div className="section fade-in-up">
          <div className={`${css['body']} clear-vertical`} id="general-info">
            <Tabs tabs={tabs} accordionRefs={accordionRefs} />

            <div className={css['general-info']}>
              <div className={css['left']}>
                {/* <p className={`${css['title']} uppercase`}>
                  TURKIYE - <span className="bold">[ TUR-KI-YEHHHH ]</span>
                </p> */}

                <p className="bold big-text">Welcome, Ethereum explorers, to Istanbul!</p>

                <br />

                <p>
                  Our destination for Devconnect 2023 is Istanbul - A city that is home to many cultures and bridges two
                  continents, Europe and Asia. It&apos;s a popular destination for visitors because it&apos;s easy to
                  reach via its major international airport (IST), it&apos;s very affordable to live, public transport
                  is efficient and cheap, hospitality is genuine, and there&apos;s a lot to explore: bazaars, spices,
                  kebaps, baklava, the Bosporus strait, and the city&apos;s rich culture and heritage.
                </p>

                <br />

                <p>
                  This guide aims to prepare you for the best Devconnect experience in Istanbul, providing you with
                  resources and covering more than just the basics.
                </p>

                {/* <br />

                <div className={css['call-to-action']}>
                  <Link
                    href="https://www.google.com/maps/d/embed?mid=143AuN51prJpx6M62b9xMTAwdXNm-dstJ&hl=en&ehbc=2E312F"
                    indicateExternal
                    className={`button sm orange-fill`}
                  >
                    Venues Map
                  </Link>

                  <Link
                    href="https://amsterdamblockchainweek.org/"
                    indicateExternal
                    className={`button sm orange-fill`}
                  >
                    AMS Blockchain Week
                  </Link>
                </div> */}
              </div>

              <div className={css['right']}>
                <List accordionRefs={accordionRefs} />
              </div>
            </div>

            <Accordion>
              {tabs.slice(1).map((tab, index) => {
                const tabContent = tabs[index + 1]

                return (
                  <AccordionItem
                    key={tab.value}
                    title={tab.text}
                    id={tab.value}
                    ref={el => (accordionRefs.current[tab.value] = el)}
                  >
                    {tabContent.content && tabContent.content()}
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </div>

      {/* <div className={css['map']} id="city-map">
        <div className={css['title']}>
          <div className={`section`}>
            <div className="clear-vertical">
              <p className={`large-text bold uppercase`}>Notable Locations</p>
            </div>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/d/embed?mid=143AuN51prJpx6M62b9xMTAwdXNm-dstJ&hl=en&ehbc=2E312F"
          width="100%"
          height="100%"
        ></iframe>
      </div> */}

      <Footer />
    </>
  )
}

export default CityGuide
