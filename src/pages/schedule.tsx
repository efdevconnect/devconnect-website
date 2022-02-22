import next, { NextPage } from 'next'
import React, { useEffect } from 'react'
import { Client } from '@notionhq/client'
import css from './schedule.module.scss'
import { Footer } from './index'
import moment from 'moment'
import ListIcon from 'assets/icons/list.svg'
import CalendarIcon from 'assets/icons/calendar.svg'
import ChevronDown from 'assets/icons/chevron-down.svg'
import ChevronUp from 'assets/icons/chevron-up.svg'
// import AddToCalendarIcon from 'assets/icons/add-to-calendar.svg'
import SwipeToScroll from 'common/components/swipe-to-scroll'
import { SEO } from 'common/components/SEO'
import Hero from 'common/components/hero'
import Link, { useDraggableLink } from 'common/components/link'
import Modal from 'common/components/modal'
import momentTZ from 'moment-timezone'
import ScheduleBackground from 'assets/images/schedule-bg.svg'
import Dropdown from 'common/components/dropdown'
import DevconnectAmsterdam from 'assets/images/amsterdam-logo-with-eth.svg'

const sortEvents = (a: any, b: any) => {
  const aStartDay = moment(a.Date.startDate),
    aEndDay = moment(a.Date.endDate),
    aTotalDays = aEndDay.diff(aStartDay, 'days') + 1
  const bStartDay = moment(b.Date.startDate),
    bEndDay = moment(b.Date.endDate),
    bTotalDays = bEndDay.diff(bStartDay, 'days') + 1

  if (aStartDay.isBefore(bStartDay)) {
    return -1
  } else if (aStartDay.isSame(bStartDay)) {
    if (aTotalDays > bTotalDays) return -1
    if (bTotalDays > aTotalDays) return 1

    return 0
  } else {
    return 1
  }
}

const getEventBoundaries = (events: any) => {
  let min: moment.Moment | undefined, max: moment.Moment | undefined

  events.forEach((event: any) => {
    const startDay = moment(event.Date.startDate),
      endDay = moment(event.Date.endDate)

    if (min ? startDay.isBefore(min) : true) min = startDay
    if (max ? endDay.isAfter(max) : true) max = endDay
  })

  return { min, max }
}

const calculateEventDuration = (min: moment.Moment | undefined, max: moment.Moment | undefined) => {
  if (max && min) {
    return max?.diff(min, 'days') + 1
  }

  return 0
}

const htmlEscape = (input: string) => {
  input = input.replace(/&/g, '&amp;')
  input = input.replace(/</g, '&lt;')
  input = input.replace(/>/g, '&gt;')
  return input
}

const htmlDecode = (content: string) => {
  let e = document.createElement('div')
  e.innerHTML = content
  return e.childNodes.length === 0 ? '' : (e.childNodes[0].nodeValue as any)
}

// Events have a bunch of date formatting going on, heres a utility to generate them:
const getFormattedEventData = (event: any, day: any) => {
  const currentDate = day
  const startDate = moment(event.Date.startDate)
  const endDate = moment(event.Date.endDate)
  const formattedDate = currentDate.format('MMM DD')
  const formattedStartDate = startDate.format('MMM DD')
  const formattedEndDate = endDate.format('MMM DD')
  const duration = calculateEventDuration(startDate, endDate)
  const isMultiDayEvent = duration > 1
  const timeOfDayArray = event['Time of Day'] && event['Time of Day'].split(',')
  const timeOfDayIndex = currentDate.diff(startDate, 'days')
  const timeOfDay = timeOfDayArray && timeOfDayArray[timeOfDayIndex]

  return {
    currentDate,
    startDate,
    endDate,
    formattedDate,
    formattedStartDate,
    formattedEndDate,
    duration,
    isMultiDayEvent,
    timeOfDayArray,
    timeOfDayIndex,
    timeOfDay,
  }
}

// Overall schedule data (for the whole week, as opposed to the individual events)
const useScheduleData = (events: any) => {
  const scheduleHelpers = React.useMemo(() => {
    const { min, max } = getEventBoundaries(events)
    const eventDuration = calculateEventDuration(min, max)
    const sortedEvents = events.slice().sort(sortEvents)
    const eventsByDay = {} as { [key: number]: any[] }

    // Group events by their dates (including spreading out over multiple days if events are multiday) - makes it easier to work with later, e.g. to check if a given day in the event range actually has events or not
    sortedEvents
      .slice()
      // Turns out reversing the "timeline view" sorting algorithm yields good results for multi-day events in list view
      .reverse()
      .forEach((event: any) => {
        const eventBoundaries = getEventBoundaries([event])
        const firstDay = eventBoundaries.min ? eventBoundaries.min.diff(min, 'days') : 0
        const lastDay = eventBoundaries.max ? eventBoundaries.max.diff(min, 'days') + 1 : 1

        for (let i = firstDay; i < lastDay; i++) {
          const dayIsIndexed = !!eventsByDay[i]

          if (dayIsIndexed) {
            eventsByDay[i] = [event, ...eventsByDay[i]]
          } else {
            eventsByDay[i] = [event]
          }
        }
      })

    // const nEmptyDays = eventDuration - Object.keys(eventsByDay).length

    return {
      sortedEvents,
      events,
      eventsByDay,
      eventDuration,
      // nEmptyDays,
      min,
      max,
    }
  }, [events])

  return scheduleHelpers
}

// Utility function for keeping track of placed nodes (used by calendar view algo)
const createPlacementTracker = () => {
  const occupiedNodes = {} as {
    [key: number]: {
      [key: number]: boolean
    }
  }

  return {
    occupiedNodes,
    placeItem: (currentRow: number, start: number, duration: number) => {
      const canBePlaced = typeof occupiedNodes?.[currentRow]?.[start] === 'undefined'

      if (canBePlaced) {
        for (let i = start; i < start + duration; i++) {
          occupiedNodes[currentRow] = {
            ...occupiedNodes[currentRow],
            [i]: true,
          }
        }

        return true
      }

      return false
    },
  }
}

// Calendar view (as opposed to list view)
const Calendar = (props: any) => {
  const { min, sortedEvents, events: defaultSortEvents, eventDuration, eventsByDay } = props
  const placementTracker = createPlacementTracker()
  const [eventModalOpen, setEventModalOpen] = React.useState('')
  const draggableAttributes = useDraggableLink()

  const events = sortedEvents.map((event: any) => {
    const startDay = moment(event.Date.startDate)
    const endDay = moment(event.Date.endDate)
    const totalDays = endDay.diff(startDay, 'days') + 1
    const offsetFromFirstDay = startDay.diff(min, 'days') + 1

    // We don't render empty days, so we have to account for that when placing items into our grid - we subtract the empty days prior to the current event, treating them as if they don't exist in the grid
    const offsetFromFirstEventInSchedule = startDay.diff(moment(sortedEvents[0].Date.startDate), 'days')
    let subtractDays = 0
    Array.from(Array(offsetFromFirstEventInSchedule)).forEach((_, index: number) => {
      const emptyDay = !eventsByDay[index]

      if (emptyDay) subtractDays++
    })

    let currentRow = 1 // css property grid-row starts at 1

    /*
        1) Place at first available Y value in the start date column, filling in horizontally if multiple days
        2) If the column Y is already occupied (by another event extending into the day), increase column Y by 1, repeat until free space
          note: Horizontally there will always be room, by definition, because we are filling in left to right 
        3) Keep track of used grid slots along the way (to allow for step 2)
      */
    while (!placementTracker.placeItem(currentRow, offsetFromFirstDay - subtractDays, totalDays)) {
      currentRow++
    }

    const gridPlacement = {
      gridRow: currentRow + 1, // Add 1 to account for the dates occupying the first row
      gridColumn: `${offsetFromFirstDay - subtractDays} / span ${totalDays}`,
      '--eventLength': totalDays,
    }

    return (
      <div
        key={event.Name}
        className={`${css['event']} ${css[event['Stable ID']]} ${css[event['Difficulty']]}`}
        style={gridPlacement}
        {...draggableAttributes}
        onClick={e => {
          draggableAttributes.onClick(e)

          if (!e.defaultPrevented) {
            setEventModalOpen(event.Name)
          }
        }}
      >
        <div className={css['content']}>
          {event['Stable ID'] === 'Cowork' && (
            <div className={css['image']}>
              <DevconnectAmsterdam style={{ width: '50px' }} />
            </div>
          )}
          <div className={css['content-inner']}>
            <div className={css['top']}>
              {
                /*event.URL*/ false ? (
                  <Link
                    href={event.URL}
                    indicateExternal
                    className={`large-text-em bold ${css['title']} ${totalDays === 1 ? css['single-day'] : ''}`}
                  >
                    {event.Name}
                  </Link>
                ) : (
                  <p className={`large-text-em bold ${css['title']} ${totalDays === 1 ? css['single-day'] : ''}`}>
                    {event.Name}
                  </p>
                )
              }
              {event['Time of Day'] && (
                <div className={css['when']}>
                  {Array.from(Array(totalDays)).map((_, index: number) => {
                    const timeOfDayArray = event['Time of Day'] && event['Time of Day'].split(',')
                    const time = timeOfDayArray[index]
                    const useDayIndicator = !!timeOfDayArray[1] && totalDays > 1

                    if (!time) return null

                    return (
                      <p className="bold" key={index}>
                        <span className={css['time']}>{time}</span>
                        {useDayIndicator && (
                          <>
                            <br />
                            <span className={`${css['which-day']} small-text-em`}>Day {index + 1}</span>
                          </>
                        )}
                      </p>
                    )
                  })}
                </div>
              )}
            </div>

            <div className={css['bottom']}>
              <div className={`${css['organizers']} bold`}>
                {event['Organizer'] ? event['Organizer'].join(', ') : <p>Organizer</p>}
              </div>

              <EventMeta event={event} />
            </div>
          </div>
        </div>

        <LearnMore event={event} open={eventModalOpen === event.Name} close={() => setEventModalOpen('')} />
      </div>
    )
  })

  return (
    <>
      <div className={`${css['calendar-background']} clear-vertical`}>
        <ScheduleBackground />
      </div>
      <SwipeToScroll noBounds stopped={eventModalOpen !== ''}>
        <div className={css['calendar']}>
          {events}

          {Array.from(Array(eventDuration)).map((_, index: number) => {
            const day = moment(defaultSortEvents[0].Date.startDate).add(index, 'days')
            const weekday = day.format('ddd')
            const date = day.format('MMM DD')
            const noEventsForDay = !eventsByDay[index]

            if (noEventsForDay) return null

            return (
              <div className={css['day']} key={index}>
                <p>{weekday}</p>
                <p>{date}</p>
              </div>
            )
          })}
        </div>
      </SwipeToScroll>
    </>
  )
}

const EventMeta = (props: any) => {
  return (
    <div className={css['meta']}>
      {props.event.Category &&
        props.event.Category.length > 0 &&
        props.event.Category.map((category: any) => {
          return (
            <div key={category} className={`tag tiny-text-em`}>
              {category}
            </div>
          )
        })}
      {props.event['Difficulty'] && <div className={`tiny-text-em ${css['difficulty']}`}>{props.event.Difficulty}</div>}
    </div>
  )
}

const LearnMore = (props: { open: boolean; close: () => void; event: any }) => {
  let className = css['call-to-action']

  return (
    <>
      <div className={`${className} tiny-text-em bold`}>Learn More →</div>

      <Modal open={props.open} close={props.close}>
        <div className={css['learn-more-modal']}>
          <ListCalendarEventMobile {...getFormattedEventData(props.event, moment())} event={props.event} />
        </div>
      </Modal>
    </>
  )
}

const ListCalendarTableHeader = (props: any) => {
  return (
    <div className={`uppercase ${css['calendar-list-table-header']} ${css['calendar-list-grid']}`}>
      <div className={css['col-1']}>Date & Time</div>
      <div className={css['col-2']}>Event</div>
      <div className={css['col-3']}>Organizers</div>
      <div className={css['col-4']}>Attend</div>
    </div>
  )
}

const ListCalendarDayHeader = React.forwardRef((props: any, ref: any) => {
  const [open, setOpen] = React.useState(true)
  const day = props.date.format('dddd')
  const date = props.date.format('MMM DD')
  let className = css['day-header']

  if (open) className += ` ${css['open']}`

  React.useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    }
  })

  return (
    <>
      <div className={className} onClick={() => setOpen(!open)}>
        <div className={css['date']}>
          <p className="section-header thin large-text">{day}</p>
          <p className="section-header thin small-text">{date}</p>
        </div>

        <div className={css['toggle-open']}>{open ? <ChevronUp /> : <ChevronDown />}</div>
      </div>
      {open && props.children}
    </>
  )
})

ListCalendarDayHeader.displayName = 'ListCalendarDayHeader'

const ListCalendarEventDesktop = (props: any) => {
  const { formattedDate, timeOfDay, isMultiDayEvent, formattedStartDate, formattedEndDate } = props

  return (
    <div
      className={`${css['event-in-table']} ${css[props.event['Stable ID']]} ${css[props.event['Difficulty']]} ${
        css['calendar-list-grid']
      }`}
    >
      <div className={`${css['date']} ${css['col-1']}`}>
        <div>
          <p className="big-text uppercase">
            {formattedDate} — <br /> <span className="big-text">{timeOfDay}</span>
          </p>
          {isMultiDayEvent && (
            <p className={`${css['end-date']} tiny-text uppercase`}>
              {formattedStartDate} — {formattedEndDate}
            </p>
          )}
        </div>

        {isMultiDayEvent && (
          <div className={`tag purple tiny-text-em ${css['multi-day-indicator']}`}>Multi-day Event</div>
        )}
        {props.event['Stable ID'] === 'Cowork' && (
          <div className={css['cowork-image']}>
            <DevconnectAmsterdam />
          </div>
        )}
      </div>

      <div className={`${css['description']} ${css['col-2']}`}>
        <div>
          {props.event.URL ? (
            <Link href={props.event.URL} indicateExternal className={`${css['title']} big-text bold uppercase`}>
              {props.event.Name}
            </Link>
          ) : (
            <p className={`${css['title']} big-text bold uppercase`}>{props.event.Name}</p>
          )}
          {props.event['Brief Description'] && (
            <p
              className={`${css['body']} small-text`}
              dangerouslySetInnerHTML={{ __html: htmlDecode(htmlEscape(props.event['Brief Description'])) }}
            />
          )}
        </div>
        <EventMeta event={props.event} />
      </div>

      <div className={`${css['organizers']} ${css['col-3']}`}>
        {props.event['Organizer'] && (
          <p className={`uppercase ${css['organizers']}`}>{props.event['Organizer'].join(', ')}</p>
        )}
      </div>

      <div className={`${css['attend']} ${css['col-4']}`}>
        {props.event['Attend'] &&
          (props.event['URL'] ? (
            <Link
              href={props.event.URL}
              indicateExternal
              className={`${css['ticket-availability']} purple small-text uppercase`}
            >
              {props.event['Attend']}
            </Link>
          ) : (
            <p className={`${css['ticket-availability']} purple small-text uppercase`}>{props.event['Attend']}</p>
          ))}
      </div>

      <div className={`${css['calendar-add']} ${css['col-5']}`}>{/* <AddToCalendarIcon /> */}</div>
    </div>
  )
}

const ListCalendarEventMobile = (props: any) => {
  const { formattedDate, timeOfDay, isMultiDayEvent, formattedStartDate, formattedEndDate } = props

  return (
    <div className={`${css['event']} ${css[props.event['Stable ID']]} ${css[props.event['Difficulty']]} `}>
      {props.event.URL ? (
        <Link href={props.event.URL} indicateExternal className={`${css['title']} large-text uppercase bold`}>
          {props.event.Name}
        </Link>
      ) : (
        <p className={`${css['title']} large-text uppercase bold`}>{props.event.Name}</p>
      )}

      <div className={css['date']}>
        <p className={`small-text uppercase ${css['time-of-day']}`}>
          {formattedDate} — <br /> <span className="large-text">{timeOfDay}</span>
        </p>
        {isMultiDayEvent && (
          <p className={`${css['end-date']} small-text uppercase`}>
            {formattedStartDate} — {formattedEndDate}
          </p>
        )}
      </div>

      {isMultiDayEvent && <div className={`tag purple tiny-text ${css['multi-day-indicator']}`}>Multi-day Event</div>}

      {props.event['Stable ID'] === 'Cowork' && <DevconnectAmsterdam style={{ width: '50px' }} />}

      {props.event['Brief Description'] && (
        <p
          className={`${css['description']} small-text`}
          dangerouslySetInnerHTML={{ __html: htmlDecode(htmlEscape(props.event['Brief Description'])) }}
        />
      )}

      {props.event['Organizer'] && (
        <p className={`uppercase ${css['organizers']}`}>{props.event['Organizer'].join(', ')}</p>
      )}

      {props.event['Attend'] &&
        (props.event['URL'] ? (
          <Link
            href={props.event.URL}
            indicateExternal
            className={`${css['ticket-availability']} bold border-top border-bottom purple small-text uppercase`}
          >
            {props.event['Attend']}
          </Link>
        ) : (
          <p className={`${css['ticket-availability']} bold border-top border-bottom purple small-text uppercase`}>
            {props.event['Attend']}
          </p>
        ))}

      <div className={css['bottom']}>
        <EventMeta event={props.event} />

        {/* <AddToCalendarIcon className={css['add-to-calendar']} /> */}
      </div>
    </div>
  )
}

const ListCalendarEvent = (props: any) => {
  const formattedEventData = getFormattedEventData(props.event, props.day)

  return (
    <>
      {/* List view as table/grid (desktop) */}
      <ListCalendarEventDesktop {...formattedEventData} event={props.event} />
      {/* List view (mobile) */}
      <ListCalendarEventMobile {...formattedEventData} event={props.event} />
    </>
  )
}

const ListCalendar = (props: any) => {
  const { eventDuration, eventsByDay, sortedEvents, events } = props

  return (
    <div className={css['calendar-list']}>
      <ListCalendarTableHeader />
      {Array.from(Array(eventDuration)).map((_, index: number) => {
        const day = moment(events[0].Date.startDate).add(index, 'days')
        const eventsForDay = eventsByDay[index]

        // Some days within the event range may not have any events
        if (!eventsForDay) return null

        return (
          <ListCalendarDayHeader key={index} date={day} ref={el => (props.accordionRefs.current[day.valueOf()] = el)}>
            {eventsForDay.map((event: any, index: number) => {
              return <ListCalendarEvent event={event} key={index} day={day} />
            })}
          </ListCalendarDayHeader>
        )
      })}
    </div>
  )
}

const useFilter = (events: any) => {
  const keysToFilterOn = ['Category', 'Difficulty', 'Attend']
  const [filters, setFilters] = React.useState({} as { [key: string]: any })
  const filterableValues = {} as { [key: string]: Set<string> }

  // Run through events collecting all the possible values to filter on for the specified keys above - looks a bit messy but w/e
  // Could hardcode the filter values too but this is future proof if someone changes the range of possible values for any of the above fields
  events.forEach((event: any) => {
    keysToFilterOn.forEach((key: any) => {
      const value = event[key]
      if (value) {
        if (!filterableValues[key]) filterableValues[key] = new Set()

        if (Array.isArray(value)) {
          value.forEach((val: any) => {
            if (!filterableValues[key].has(val)) filterableValues[key].add(val)
          })
        } else {
          if (!filterableValues[key].has(value)) filterableValues[key].add(event[key])
        }
      }
    })
  })

  const activeFilters = Object.keys(filters)

  const filteredEvents =
    activeFilters.length === 0
      ? events
      : events.filter((event: any) => {
          return activeFilters.every(key => {
            const activeFilter = filters[key]

            if (Array.isArray(event[key])) return event[key].includes(activeFilter)

            return activeFilter === event[key]
          })
        })

  return {
    events: filteredEvents,
    keysToFilterOn,
    filterableValues,
    filters,
    onChange: (key: string, value: string) => {
      const nextFilter = {
        ...filters,
        [key]: value,
      } as { [key: string]: string }

      if (!value) delete nextFilter[key]

      setFilters(nextFilter)
    },
  }
}

const Filter = (props: any) => {
  return (
    <div className={`${css['filter']} small-text`}>
      <p className="bold">Filter:</p>
      {props.keysToFilterOn.map((key: string) => {
        const valuesToFilterBy = props.filterableValues[key]

        if (!valuesToFilterBy) return null

        return (
          <div key={key}>
            {/* {key} */}
            <Dropdown
              placeholder={key}
              value={props.filters[key]}
              onChange={val => props.onChange(key, val)}
              options={Array.from(props.filterableValues[key]).map(filterValue => {
                return {
                  text: filterValue,
                  value: filterValue,
                }
              })}
            />
          </div>
        )
      })}
    </div>
  )
}

const Expand = (props: any) => {
  if (props.scheduleView !== 'list') return null

  return (
    <div className={css['expand-container']}>
      <button
        className={`${css['expand-list']} small-text`}
        onClick={() => Object.values(props.accordionRefs.current).forEach((acc: any) => acc && acc.open && acc.open())}
      >
        <span>
          <ChevronUp />
          <ChevronDown />
        </span>
        <p className="small-text bold">Expand</p>
      </button>
      <button
        className={`${css['expand-list']} small-text`}
        onClick={() =>
          Object.values(props.accordionRefs.current).forEach((acc: any) => acc && acc.close && acc.close())
        }
      >
        <span>
          <ChevronDown />
          <ChevronUp />
        </span>
        <p className="small-text bold">Collapse</p>
      </button>
    </div>
  )
}

const Schedule: NextPage = (props: any) => {
  const [scheduleView, setScheduleView] = React.useState('calendar')
  const { events, ...filterAttributes } = useFilter(props.events)
  const scheduleHelpers = useScheduleData(events)
  const accordionRefs = React.useRef({} as { [key: string]: any })

  React.useEffect(() => {
    if (filterAttributes.filters) {
      Object.values(accordionRefs.current).forEach(acc => acc && acc.open && acc.open())
    }
  }, [filterAttributes.filters])

  return (
    <>
      <SEO title="Schedule" description="Devconnect schedule" />
      <Hero className={`${css['hero']}`} autoHeight backgroundTitle="Schedule">
        <p className="uppercase extra-large-text bold secondary title">schedule</p>
      </Hero>
      <div className={`${css['schedule']} section`}>
        <div className="fade-in-up clear-vertical">
          <div className={`${css['header-row']}`}>
            <h1 className="extra-large-text uppercase bold">Devconnect week</h1>
            <div className={`${css['view']} small-text`}>
              <div className={css['options']}>
                <button
                  className={`${scheduleView === 'list' && css['selected']} ${css['switch']}`}
                  onClick={() => setScheduleView('list')}
                >
                  <ListIcon style={{ fontSize: '1.1em' }} />
                  <p className={`${css['text']} small-text`}>List</p>
                </button>
                <button
                  className={`${scheduleView === 'calendar' && css['selected']} ${css['switch']}`}
                  onClick={() => setScheduleView('calendar')}
                >
                  <CalendarIcon />
                  <p className={`${css['text']} small-text`}>Timeline</p>
                </button>
              </div>
            </div>
          </div>

          <div className={`${css['top-bar']}`}>
            {/* <SwipeToScroll> */}
            <Filter events={events} {...filterAttributes} />
            <Expand accordionRefs={accordionRefs} scheduleView={scheduleView} />
            {/* </SwipeToScroll> */}

            {scheduleView === 'calendar' && <p className={`small-text uppercase ${css['swipe']}`}>Drag for more →</p>}
          </div>

          {events.length === 0 ? (
            <div className={css['no-results']}>
              <p>No matches for this filter</p>
            </div>
          ) : (
            <>
              {/* <div className={`${css['top-bar']}`}>
                <p className={`${css['timezone']} small-text`}>
                  {momentTZ.tz('Europe/Amsterdam').format('HH:mm')} (UTC/GMT +1)
                </p>
                {scheduleView === 'calendar' && <p className={`small-text ${css['swipe']}`}>Drag for more →</p>}
              </div> */}

              {scheduleView === 'list' && <ListCalendar {...scheduleHelpers} accordionRefs={accordionRefs} />}
              {scheduleView === 'calendar' && <Calendar {...scheduleHelpers} />}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Schedule

// Notion fetch/format below
const notionDatabasePropertyResolver = (property: any, key: any) => {
  switch (property.type) {
    case 'text':
    case 'rich_text':
    case 'title':
      const dechunked = property[property.type]
        ? property[property.type].reduce((acc: string, chunk: any) => {
            if (chunk.href && property.type === 'rich_text' && key !== 'URL') {
              acc += `<a href=${chunk.href} target="_blank" class="generic" rel="noopener noreferrer">${chunk.plain_text}</a>`
            } else {
              acc += chunk.plain_text
            }

            return acc
          }, '')
        : null

      return `${dechunked}`

    case 'date':
      if (property.date) {
        return {
          startDate: property.date.start,
          endDate: property.date.end || property.date.start,
        }
      }

      return null

    case 'multi_select':
      if (property.multi_select) {
        return property.multi_select.map((value: any) => value.name)
      }

      return null
    case 'select':
      return property.select && property.select.name

    default:
      return 'default value no handler for: ' + property.type
  }
}

const formatResult = (result: any) => {
  const properties = {} as { [key: string]: any }

  // Format the raw notion data into something more workable
  Object.entries(result.properties).forEach(([key, value]) => {
    const val = notionDatabasePropertyResolver(value, key)

    if (Array.isArray(val)) {
      properties[key] = val
    } else if (typeof val === 'object' && val !== null) {
      properties[key] = {
        ...val,
      }
    } else {
      properties[key] = val
    }
  })

  // This isn't the cleanest way to insert default values for time of day, but time crunch so being pragmatic
  if (!properties['Time of Day'])
    properties['Time of Day'] =
      'Full Day,Full day,Full Day,Full day,Full Day,Full day,Full Day,Full day,Full Day,Full day,Full Day,Full day,Full day'

  return properties
}

export async function getStaticProps() {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const databaseID = '8b177855e75b4964bb9f3622437f04f5'

  let data = {}
  // let raw = {}

  try {
    // Notion returns up to 100 results per request. We won't have that many events, but if we ever get close, add support for pagination at this step.
    const response = await notion.databases.query({
      database_id: databaseID,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
        {
          property: 'Priority (sort)',
          direction: 'descending',
        },
      ],
      filter: {
        and: [
          {
            property: 'Date',
            date: {
              is_not_empty: true,
            },
          },
          {
            property: 'Live',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    })

    data = response.results.map(formatResult)
    // raw = response.results
  } catch (error) {
    if (false) {
      // Handle error codes here if necessary
    } else {
      // Other error handling code
      console.error(error)
    }
  }

  return {
    props: {
      events: data,
      // raw,
    },
    revalidate: 1 * 60 * 30, // 30 minutes, in seconds
  }
}
