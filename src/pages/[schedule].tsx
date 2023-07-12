import next, { NextPage } from 'next'
import React, { useEffect } from 'react'
import { Client } from '@notionhq/client'
import css from './[schedule].module.scss'
import { Footer } from './index'
import moment from 'moment'
import momentTZ from 'moment-timezone'
import ListIcon from 'assets/icons/list.svg'
import CalendarIcon from 'assets/icons/calendar.svg'
import PeopleIcon from 'assets/icons/people.svg'
import ChevronDown from 'assets/icons/chevron-down.svg'
import ChevronUp from 'assets/icons/chevron-up.svg'
import AddToCalendarIcon from 'assets/icons/add-to-calendar.svg'
import SwipeToScroll from 'common/components/swipe-to-scroll'
import { SEO } from 'common/components/SEO'
import Hero from 'common/components/hero'
import Link, { useDraggableLink } from 'common/components/link'
import Modal from 'common/components/modal'
import ScheduleBackgroundAmsterdam from 'assets/images/schedule-bg.svg'
import DevconnectIstanbul from 'assets/images/istanbul-logo-with-eth.svg'
import Dropdown from 'common/components/dropdown'
import DevconnectAmsterdam from 'assets/images/amsterdam-logo-with-eth.svg'
import Alert from 'common/components/alert'
import { useRouter } from 'next/dist/client/router'
// @ts-ignore
import Toggle from 'react-toggle'
import Retro from 'common/components/pages/event/retro'

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
    const startDay = moment.utc(event.Date.startDate),
      endDay = moment.utc(event.Date.endDate)

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
  input = input.replace(/\n/g, '<br />')
  input = input.replace(/</g, '&lt;')
  input = input.replace(/>/g, '&gt;')
  return input
}

const htmlDecode = (content: string) => {
  let e = document.createElement('div')
  e.innerHTML = content
  return e.childNodes.length === 0 ? '' : (e.childNodes[0].nodeValue as any)
}

const leftPadNumber = (number: number) => {
  if (number < 10) {
    return `0${number}`
  }

  return number
}

// Confirm time format is consistent e.g. 09:30 or 17:30
const sanitizeEventTime = (eventTime: string) => {
  if (!eventTime) return null

  const normalizedEventTime = eventTime.trim()
  const isCorrectFormat = normalizedEventTime.match(/\d{2}:\d{2}/) !== null

  if (isCorrectFormat) {
    const asMoment = moment.duration(normalizedEventTime)

    return {
      calendarTime: `${leftPadNumber(asMoment.get('hours'))}${leftPadNumber(asMoment.get('minutes'))}${leftPadNumber(
        asMoment.get('seconds')
      )}`,
      normalizedEventTime,
    }
  }

  return null
}

// Events have a bunch of date formatting going on, heres a utility to generate them:
const getFormattedEventData = (event: any, day?: any) => {
  const currentDate = day
  const startDate = moment.utc(event.Date.startDate)
  const endDate = moment.utc(event.Date.endDate)
  const formattedDate = currentDate && currentDate.format('MMM DD')
  const formattedStartDate = startDate.format('MMM DD')
  const formattedEndDate = endDate.format('MMM DD')
  const duration = calculateEventDuration(startDate, endDate)
  const isMultiDayEvent = duration > 1
  const timeOfDayArray = event['Time of Day'] && event['Time of Day'].split(',')
  // If its a multi day event but only one time is specified, we assume that is the time of day for the entire week
  const shouldRepeatTimeOfDay = isMultiDayEvent && timeOfDayArray.length === 1
  const timeOfDayIndex = currentDate ? currentDate.diff(startDate, 'days') : 0
  const timeOfDay = timeOfDayArray && timeOfDayArray[shouldRepeatTimeOfDay ? 0 : timeOfDayIndex]

  return {
    currentDate,
    startDate,
    endDate,
    formattedDate,
    formattedStartDate,
    formattedEndDate,
    duration,
    isMultiDayEvent,
    shouldRepeatTimeOfDay,
    timeOfDayArray,
    timeOfDayIndex,
    timeOfDay,
  }
}

// Overall schedule data (for the whole week, as opposed to the individual events)
const useScheduleData = (events: any) => {
  const scheduleHelpers = React.useMemo(() => {
    const { min, max } = getEventBoundaries(events)
    const scheduleDuration = calculateEventDuration(min, max)
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

    return {
      sortedEvents,
      events,
      eventsByDay,
      scheduleDuration,
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

// Timeline view (as opposed to list view)
const Timeline = (props: any) => {
  const { min, sortedEvents, events: defaultSortEvents, scheduleDuration, eventsByDay } = props
  const placementTracker = createPlacementTracker()
  const [eventModalOpen, setEventModalOpen] = React.useState('')
  const draggableAttributes = useDraggableLink()
  // Ref of current active day element (to scroll into view on load)
  // const todayRef = React.useRef<any>()

  // React.useEffect(() => {
  //   if (todayRef.current) {
  //     todayRef.current.scrollIntoView({ scrollIntoViewOptions: { inline: 'center' } })
  //   }
  // }, [])

  const events = sortedEvents.map((event: any, index: number) => {
    const {
      startDate: startDay,
      isMultiDayEvent,
      duration: totalDays,
      timeOfDayArray,
      shouldRepeatTimeOfDay,
    } = getFormattedEventData(event)
    const offsetFromFirstDay = startDay.diff(min, 'days') + 1
    const offsetFromFirstEventInSchedule = startDay.diff(moment.utc(sortedEvents[0].Date.startDate), 'days')
    let subtractDays = 0
    // We don't render empty days, so we have to account for that when placing items into our grid - we subtract the empty days prior to the current event, treating them as if they don't exist in the grid
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
      <React.Fragment key={event.Name + offsetFromFirstDay}>
        <div
          className={`${css['event']} ${css[event['Stable ID']]} ${css[event['Difficulty']]} ${
            event['Thematic'] ? css['thematic'] : ''
          }`}
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
                {(() => {
                  if (props.edition === 'istanbul') return <DevconnectIstanbul style={{ width: '50px' }} />
                  if (props.edition === 'amsterdam') return <DevconnectAmsterdam style={{ width: '50px' }} />
                })()}
              </div>
            )}
            <div className={css['content-inner']}>
              <div className={css['top']}>
                <p className={`large-text-em bold ${css['title']} ${totalDays === 1 ? css['single-day'] : ''}`}>
                  {event.Name}
                </p>

                {event['Time of Day'] && (
                  <div className={css['when']}>
                    {Array.from(Array(totalDays)).map((_, index: number) => {
                      const time = timeOfDayArray[index]
                      const useDayIndicator = !!timeOfDayArray[1] && totalDays > 1
                      const sameTimeEveryDay = shouldRepeatTimeOfDay && totalDays > 1 && time !== 'ALL DAY'

                      if (props.edition === 'istanbul' && event['Stable ID'] !== 'Cowork') return null
                      if (!time) return null
                      if (shouldRepeatTimeOfDay && isMultiDayEvent && index > 0) return null

                      return (
                        <div key={index}>
                          <p className="bold">
                            <span className={css['time']}>
                              {time}
                              {sameTimeEveryDay ? ' Every day' : ''}
                            </span>
                            {useDayIndicator && (
                              <>
                                <br />
                                <span className={`${css['which-day']} small-text-em`}>Day {index + 1}</span>
                              </>
                            )}
                          </p>
                          {/* {event['Stable ID'] === 'Cowork' && (
                            <i className="bold">🎉 Social hours 18:00 - 20:00 every day 🎉</i>
                          )} */}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {event['Stable ID'] !== 'Cowork' && (
                <div className={css['bottom']}>
                  <div className={`${css['organizers']} bold`}>
                    {event['Organizer'] ? event['Organizer'] : <p>Organizer</p>}
                  </div>

                  <EventMeta event={event} />
                </div>
              )}
            </div>
          </div>

          <LearnMore
            event={event}
            open={eventModalOpen === event.Name}
            close={() => setEventModalOpen('')}
            edition={props.edition}
          />
        </div>

        {/* {isLastIteration && (
          <div style={{ gridRow: `1 / ${currentRow + 1}`, gridColumn: '1 / 3', background: 'yellow' }}></div>
        )} */}
      </React.Fragment>
    )
  })

  return (
    <>
      <div className={`${css['timeline-background']} clear-vertical`}>
        {props.edition === 'amsterdam' && <ScheduleBackgroundAmsterdam />}

        {props.edition === 'istanbul' && (
          <DevconnectIstanbul style={{ maxWidth: '300px', width: '400px', opacity: 0.15, right: '16px' }} />
        )}
      </div>
      <SwipeToScroll /*focusRef={todayRef}*/ noBounds stopped={eventModalOpen !== ''}>
        <div className={css['timeline']}>
          {events}

          {Array.from(Array(scheduleDuration)).map((_, index: number) => {
            const day = moment.utc(defaultSortEvents[0].Date.startDate).add(index, 'days')
            const weekday = day.format('ddd')
            const date = day.format('MMM DD')
            const noEventsForDay = !eventsByDay[index]
            const now = momentTZ.tz(moment(), 'Europe/Amsterdam')
            const dayIsActive = day.isSame(now, 'day')

            if (noEventsForDay) return null

            let className = css['day']

            if (dayIsActive) className += ` ${css['active']}`

            return (
              <div className={className} key={index} /*ref={dayIsActive ? todayRef : undefined}*/>
                <p>{dayIsActive ? 'TODAY' : weekday}</p>
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
      {props.event['General Size'] && props.event['General Size'].length > 0 && (
        <div className={`small-text-em`} style={{ display: 'flex', alignItems: 'center' }}>
          <PeopleIcon className={`large-text-em icon`} />
          &nbsp;{props.event['General Size']}
        </div>
      )}
      {/* {props.event['Difficulty'] && (
        <div className={`small-text-em ${css['difficulty']}`}>{props.event.Difficulty}</div>
      )} */}

      <div className={css['categories']}>
        {props.event.Category &&
          props.event.Category.length > 0 &&
          props.event.Category.map((category: any) => {
            return (
              <div key={category} className={`tag tiny-text-em`}>
                {category}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const EventLinks = (props: any) => {
  const [calendarModalOpen, setCalendarModalOpen] = React.useState(false)
  const {
    startDate,
    timeOfDayArray,
    endDate,
    duration: eventDuration,
    isMultiDayEvent,
    event,
    shouldRepeatTimeOfDay,
  } = props
  const start = startDate.clone()
  const end = endDate.clone()
  const firstDay = timeOfDayArray[0]
  const lastDay = timeOfDayArray[timeOfDayArray.length - 1]

  const { calendarTime: startOfFirstDay } = sanitizeEventTime(firstDay.split('-')[0]) || { calendarTime: '000000' }
  const { calendarTime: endOfLastDay } = sanitizeEventTime(lastDay.split('-')[1]) || { calendarTime: '000000' }

  const description = (() => {
    let humanReadableTimes: string[] = []

    const allEventTimesValid = timeOfDayArray.every((time: string, index: number) => {
      const startOfDay = sanitizeEventTime(time.split('-')[0])
      const endOfDay = sanitizeEventTime(time.split('-')[1])
      const timeIsValid = startOfDay && endOfDay

      if (timeIsValid) {
        const timeOfDay = `${startOfDay.normalizedEventTime} - ${endOfDay.normalizedEventTime}`

        if (isMultiDayEvent && !shouldRepeatTimeOfDay) {
          humanReadableTimes.push(`Day ${index + 1}: ${timeOfDay}`)
        } else {
          humanReadableTimes.push(`${timeOfDay}`)
        }
      }

      return timeIsValid
    })

    if (!allEventTimesValid) return null

    return `${event['Name']} - ${humanReadableTimes.join(', ')}`
  })()

  const enableAddToCalendar = description !== null

  const googleCalUrl = (() => {
    const googleCalUrl = new URL(`https://www.google.com/calendar/render?action=TEMPLATE&ctz=Europe/Amsterdam`)
    // const googleCalUrl = new URL(`https://www.google.com/calendar/render?action=TEMPLATE`)

    googleCalUrl.searchParams.append('text', `${event.Name}`)
    googleCalUrl.searchParams.append('details', `${description}`)

    if (event.Location.url) googleCalUrl.searchParams.append('location', `${event.Location.text}`)

    return googleCalUrl
  })()

  const ics = [`BEGIN:VCALENDAR`, `PRODID:devconnect.org`, `METHOD:PUBLISH`, `VERSION:2.0`, `CALSCALE:GREGORIAN`]

  if (isMultiDayEvent) {
    // Have to add a day for multi-day events since the final day is not included in the range
    // (if not, it will make a boundary at exactly midnight on the previous day since the dates default to 00:00 when no time is specified)
    end.add(1, 'days')

    googleCalUrl.searchParams.append('dates', `${start.format('YYYYMMDD')}/${end.format('YYYYMMDD')}`)

    ics.push(
      `BEGIN:VEVENT`,
      `UID:${event.Name}`,
      `DTSTAMP:${moment.utc().format('YYYYMMDDTHHmmss')}`,
      `DTSTART:${start.format('YYYYMMDD')}`,
      `DTEND:${end.format('YYYYMMDD')}`,
      `SUMMARY:${event.Name}`,
      `DESCRIPTION:${description}`,
      event.Location.url && `URL;VALUE=URI:${event.Location.url}`,
      event.Location.url && `LOCATION:${event.Location.text}`,
      `END:VEVENT`
    )
  } else {
    googleCalUrl.searchParams.append(
      'dates',
      `${start.format('YYYYMMDD')}T${startOfFirstDay}/${end.format('YYYYMMDD')}T${endOfLastDay}`
    )

    ics.push(
      `BEGIN:VEVENT`,
      `UID:${event.Name}`,
      `DTSTAMP:${moment.utc().format('YYYYMMDDTHHmmss')}`,
      `DTSTART:${start.format('YYYYMMDD')}T${startOfFirstDay}`,
      `DTEND:${end.format('YYYYMMDD')}T${endOfLastDay}`,
      `SUMMARY:${event.Name}`,
      `DESCRIPTION:${description}`,
      event.Location.url && `URL;VALUE=URI:${event.Location.url}`,
      event.Location.url && `LOCATION:${event.Location.text}`,
      `END:VEVENT`
    )
  }

  ics.push(`END:VCALENDAR`)

  const file = new Blob([ics.filter((row: string) => !!row).join('\n')], { type: 'text/calendar' })
  const icsAttributes = {
    href: URL.createObjectURL(file),
    download: `${event.Name}.ics`,
  }

  return (
    <div className={`${css['event-links']} small-text uppercase`}>
      {event.URL && event.URL.length > 0 ? (
        <Link href={event.URL} indicateExternal>
          Visit website
        </Link>
      ) : (
        <p>Website coming soon</p>
      )}

      {props.edition === 'istanbul' && event['Stable ID'] !== 'Cowork' && <p>Location coming soon</p>}

      {(props.edition !== 'istanbul' || event['Stable ID'] === 'Cowork') && event.Location && event.Location.url && (
        <Link href={event.Location.url} indicateExternal>
          Location
        </Link>
      )}

      {event['Stream URL'] && (
        <Link href={event['Stream URL']} indicateExternal className="button xs orange-fill">
          Stream
        </Link>
      )}

      {props.edition !== 'istanbul' && enableAddToCalendar && (
        <>
          <div className={css['add-to-calendar']}>
            <AddToCalendarIcon className={`big-text icon`} onClick={() => setCalendarModalOpen(true)} />
          </div>

          {calendarModalOpen && (
            <Modal
              className={css['add-to-calendar-modal']}
              open={calendarModalOpen}
              close={() => setCalendarModalOpen(false)}
            >
              <div className={css['add-to-calendar-modal-content']}>
                <p className="bold uppercase">Add event to your calendar:</p>

                <a {...icsAttributes} className="button sm small-text">
                  Download (.ICS)
                </a>

                <Link indicateExternal href={googleCalUrl.href} className="button sm small-text">
                  Google Calendar
                </Link>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  )
}

const LearnMore = (props: { open: boolean; close: () => void; event: any; edition: any }) => {
  let className = css['learn-more']

  return (
    <>
      <div
        className={`${className} ${css[`edition-${props.edition}`]} tiny-text-em bold`}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <p>Learn More →</p>
        {props.event['Attend'] && <p className={css['attend-details']}>{props.event['Attend']}</p>}
      </div>

      <Modal
        open={props.open}
        close={props.close}
        className={`${css['learn-more-modal']} ${css[`edition-${props.edition}`]}`}
      >
        <div className={css['learn-more-modal-content']}>
          <ListEventMobile
            {...getFormattedEventData(props.event)}
            event={props.event}
            timeline
            edition={props.edition}
          />
        </div>
      </Modal>
    </>
  )
}

const ListTableHeader = () => {
  return (
    <div className={`uppercase ${css['list-table-header']} ${css['list-grid']}`}>
      <div className={css['col-1']}>Date & Time</div>
      <div className={css['col-2']}>Event</div>
      <div className={css['col-3']}>Organizers</div>
      <div className={css['col-4']}>Attend</div>
    </div>
  )
}

const ListDayHeader = React.forwardRef((props: any, ref: any) => {
  // const [open, setOpen] = React.useState(true)
  const day = props.date.format('dddd')
  const date = props.date.format('MMM DD')
  const now = momentTZ.tz(moment(), 'Europe/Amsterdam')
  const dayIsActive = props.date.isSame(now, 'day')
  const [open, setOpen] = React.useState(dayIsActive)

  let className = css['day-header']

  // if (dayIsActive) className += ` ${css['active']}`
  if (open) className += ` ${css['open']}`

  React.useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    }
  })

  return (
    <div>
      <div className={className} onClick={() => setOpen(!open)}>
        <div className={css['date']}>
          <p className="section-header thin large-text">{dayIsActive ? 'TODAY' : day}</p>
          <p className="section-header thin small-text">{date}</p>
        </div>

        <div className={css['toggle-open']}>{open ? <ChevronUp /> : <ChevronDown />}</div>
      </div>
      {open && props.children}
    </div>
  )
})

ListDayHeader.displayName = 'ListDayHeader'

const ListEventDesktop = (props: any) => {
  const { formattedDate, timeOfDay, isMultiDayEvent, formattedStartDate, formattedEndDate } = props

  return (
    <div
      className={`${css['event-in-table']} ${css[props.event['Stable ID']]} ${css[props.event['Difficulty']]} ${
        props.event['Thematic'] ? css['thematic'] : ''
      }`}
    >
      <div className={`${css['list-grid']} ${css['content']} `}>
        <div className={`${css['date']} ${css['col-1']}`}>
          <div>
            <p className="big-text uppercase">
              {formattedDate} — <br /> <span className="big-text">{timeOfDay}</span>
              {/* {props.event['Stable ID'] === 'Cowork' && (
                <>
                  <br />
                  <span className="small-text bold">Social hours 18:00 - 20:00 🎉</span>
                </>
              )} */}
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
              {(() => {
                if (props.edition === 'amsterdam') return <DevconnectAmsterdam />
                if (props.edition === 'istanbul') return <DevconnectIstanbul />
              })()}
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

            {props.edition !== 'istanbul' && props.event.Location && props.event.Location.url && (
              <Link
                href={props.event.Location.url}
                indicateExternal
                className={`${css['location']} big-text-bold uppercase`}
              >
                {props.event.Location.text}
              </Link>
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
          {props.event['Organizer'] && <p className={`uppercase ${css['organizers']}`}>{props.event['Organizer']}</p>}
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
      </div>
      <EventLinks {...props} />
    </div>
  )
}

const ListEventMobile = (props: any) => {
  const { formattedDate, timeOfDay, isMultiDayEvent, formattedStartDate, formattedEndDate } = props

  return (
    <div
      className={`${css['event']} ${css[props.event['Stable ID']]} ${css[props.event['Difficulty']]} ${
        props.event['Thematic'] ? css['thematic'] : ''
      }`}
    >
      <div className={css['content']}>
        {props.event.URL ? (
          <Link href={props.event.URL} indicateExternal className={`${css['title']} large-text uppercase bold`}>
            {props.event.Name}
          </Link>
        ) : (
          <p className={`${css['title']} large-text uppercase bold`}>{props.event.Name}</p>
        )}

        {props.edition !== 'istanbul' && props.event.Location && props.event.Location.url && (
          <Link
            href={props.event.Location.url}
            indicateExternal
            className={`${css['location']} big-text-bold uppercase`}
          >
            {props.event.Location.text}
          </Link>
        )}

        <div className={css['date']}>
          <p className={`small-text uppercase ${css['time-of-day']}`}>
            {formattedDate} — <br /> <span className="large-text">{timeOfDay}</span>
            {/* {props.event['Stable ID'] === 'Cowork' && (
              <>
                <br />
                <span className="small-text bold">Social hours 18:00 - 20:00 🎉</span>
              </>
            )} */}
          </p>
          {isMultiDayEvent && (
            <p className={`${css['end-date']} small-text uppercase`}>
              {formattedStartDate} — {formattedEndDate}
            </p>
          )}
        </div>
        {isMultiDayEvent && <div className={`tag purple tiny-text ${css['multi-day-indicator']}`}>Multi-day Event</div>}

        {(() => {
          if (props.event['Stable ID'] !== 'Cowork') return null

          if (props.edition === 'istanbul') return <DevconnectIstanbul style={{ width: '50px', display: 'block' }} />
          if (props.edition === 'amsterdam') return <DevconnectAmsterdam style={{ width: '50px', display: 'block' }} />
        })()}

        {props.event['Brief Description'] && (
          <p
            className={`${css['description']} small-text`}
            dangerouslySetInnerHTML={{ __html: htmlDecode(htmlEscape(props.event['Brief Description'])) }}
          />
        )}

        {props.event['Stable ID'] === 'Easter' && props.timeline && (
          <img src="https://c.tenor.com/thDFJno0zuAAAAAd/happy-easter-easter-bunny.gif" alt="Easter egg" width="100%" />
        )}

        {props.event['Organizer'] && <p className={`uppercase ${css['organizers']}`}>{props.event['Organizer']}</p>}
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
        </div>
      </div>
      <EventLinks {...props} />
    </div>
  )
}

const ListEvent = (props: any) => {
  const formattedEventData = getFormattedEventData(props.event, props.day)

  return (
    <>
      {/* List view as table (desktop) */}
      <ListEventDesktop {...formattedEventData} event={props.event} edition={props.edition} />
      {/* List view (mobile) */}
      <ListEventMobile {...formattedEventData} event={props.event} edition={props.edition} />
    </>
  )
}

const List = (props: any) => {
  const { scheduleDuration, eventsByDay, events } = props

  return (
    <div className={css['list']}>
      <ListTableHeader />
      {Array.from(Array(scheduleDuration)).map((_, index: number) => {
        const day = moment.utc(events[0].Date.startDate).add(index, 'days')
        const eventsForDay = eventsByDay[index]

        // Some days within the event range may not have any events
        if (!eventsForDay) return null

        return (
          <ListDayHeader key={index} date={day} ref={el => (props.accordionRefs.current[day.valueOf()] = el)}>
            {eventsForDay.map((event: any, index: number) => {
              return <ListEvent event={event} key={index} day={day} edition={props.edition} />
            })}
          </ListDayHeader>
        )
      })}
    </div>
  )
}

const useFilter = (events: any) => {
  const keysToFilterOn = ['Category', 'Difficulty', 'Attend']
  const [filters, setFilters] = React.useState({} as { [key: string]: any })
  const filterableValues = {} as { [key: string]: Set<string> }
  const [hideSoldOut, setHideSoldOut] = React.useState(false)
  const [hideProjectSpecificEvents, setHideProjectSpecificEvents] = React.useState(false)

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

  const filteredEvents = events.filter((event: any) => {
    if (hideSoldOut && ['sold out', 'applications closed'].includes(event['Attend'] && event['Attend'].toLowerCase())) {
      return false
    }

    if (hideProjectSpecificEvents && !event['Thematic']) {
      return false
    }

    if (activeFilters.length > 0) {
      return activeFilters.every(key => {
        const activeFilter = filters[key]

        if (Array.isArray(event[key])) return event[key].includes(activeFilter)

        return activeFilter === event[key]
      })
    }

    return true
  })

  return {
    events: filteredEvents,
    keysToFilterOn,
    filterableValues,
    hideSoldOut,
    setHideSoldOut,
    hideProjectSpecificEvents,
    setHideProjectSpecificEvents,
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
      {/* <p className={`${css['filter-text']} bold`}>Filter:</p> */}
      {props.keysToFilterOn.map((key: string, index: number) => {
        const valuesToFilterBy = props.filterableValues[key]

        if (!valuesToFilterBy) return null

        return (
          <div key={key}>
            <Dropdown
              pushFromLeft={index !== props.keysToFilterOn.length - 1}
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

      {/* <label className={css['toggle']}>
        <Toggle
          defaultChecked={props.hideSoldOut}
          icons={false}
          onChange={() => props.setHideSoldOut(!props.hideSoldOut)}
        />
        <span className="bold small-text">Hide sold out events</span>
      </label> */}

      <label className={css['toggle']}>
        <Toggle
          defaultChecked={props.hideProjectSpecificEvents}
          icons={false}
          onChange={() => props.setHideProjectSpecificEvents(!props.hideProjectSpecificEvents)}
        />

        <span className="bold small-text">Show only domain specific events</span>
      </label>
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

const scheduleViewHOC = (Component: any) => {
  const ComponentWithScheduleView = (props: any) => {
    const [scheduleView, setScheduleView] = React.useState('timeline')

    const router = useRouter()

    useEffect(() => {
      const hash = window.location.hash

      if (hash && hash === '#list') {
        setScheduleView('list')
        router.replace(router.pathname)
      }
    }, [])

    return <Component {...props} scheduleView={scheduleView} setScheduleView={setScheduleView} />
  }

  return ComponentWithScheduleView
}

const Schedule: NextPage = scheduleViewHOC((props: any) => {
  const { scheduleView, setScheduleView } = props
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
      <Hero
        className={`${css['hero']} ${props.edition}`}
        autoHeight
        backgroundTitle={(() => {
          if (props.edition === 'istanbul') return 'Istanbul'
          if (props.edition === 'amsterdam') return 'Amsterdam'
        })()}
      >
        <p className="uppercase extra-large-text bold secondary title">
          {(() => {
            if (props.edition === 'istanbul') return 'Istanbul 2023'
            if (props.edition === 'amsterdam') return 'Past Events - Amsterdam 2022'
          })()}
        </p>
      </Hero>

      <div className={`${css['schedule']} section ${css[`edition-${props.edition}`]}`}>
        <div className="fade-in-up clear-vertical">
          {props.edition !== 'istanbul' && <Retro />}
          <div className={`${css['header-row']}`}>
            <h1 className="extra-large-text uppercase bold">
              {(() => {
                if (props.edition === 'istanbul') return 'Schedule'
                if (props.edition === 'amsterdam') return 'Amsterdam 2022 Schedule'
              })()}
            </h1>

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
                  className={`${scheduleView === 'timeline' && css['selected']} ${css['switch']}`}
                  onClick={() => setScheduleView('timeline')}
                >
                  <CalendarIcon />
                  <p className={`${css['text']} small-text`}>Timeline</p>
                </button>
              </div>
            </div>
          </div>

          {props.edition === 'istanbul' && (
            <Alert title="Important">
              <p>
                <b>⚠️ The schedule is a work in progress.</b> Check back regularly for the most accurate, up-to-date
                information. This early look at the schedule is intended to help you start planning your travels and to
                inspire other organizers who might wish to collaborate or plan their own complementary events.{' '}
              </p>
              <p className="bold margin-top-less">
                👉 Remember, each event during Devconnect is independently hosted and you will require tickets for each
                event you wish to attend. You will find ticketing information for each event soon.
              </p>
            </Alert>
          )}

          <div className={`${css['top-bar']}`}>
            <Filter events={events} {...filterAttributes} />
            <Expand accordionRefs={accordionRefs} scheduleView={scheduleView} />

            {/* <div className={css['difficulties']}>
              <div className={css['all-welcome']}>
                <p>
                  <span className={css['indicator']}>⬤</span>All welcome
                </p>
              </div>
              <div className={css['intermediate']}>
                <p>
                  <span className={css['indicator']}>⬤</span>Intermediate
                </p>
              </div>
              <div className={css['advanced']}>
                <p>
                  <span className={css['indicator']}>⬤</span>Advanced
                </p>
              </div>
            </div> */}

            <div className={css['difficulties']}>
              <div className={css['advanced']}>
                <p>
                  <span className={css['indicator']}>⬤</span>Devconnect Cowork
                </p>
              </div>
              <div className={css['all-welcome']}>
                <p>
                  <span className={css['indicator']}>⬤</span>Domain Specific Events
                </p>
              </div>
              <div className={css['intermediate']}>
                <p>
                  <span className={css['indicator']}>⬤</span>Other Events
                </p>
              </div>
            </div>

            {scheduleView === 'timeline' && (
              <p className={`small-text bold uppercase ${css['swipe']}`}>Hold and drag schedule for more →</p>
            )}
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

              {scheduleView === 'list' && (
                <List {...scheduleHelpers} edition={props.edition} accordionRefs={accordionRefs} />
              )}
              {scheduleView === 'timeline' && <Timeline {...scheduleHelpers} edition={props.edition} />}
            </>
          )}
        </div>
        {props.edition === 'istanbul' && (
          <div className={css['organize-cta']}>
            <Link
              href="https://ef-events.notion.site/How-to-organize-an-event-during-Devconnect-4175048066254f48ae85679a35c94022"
              className={`button white sm`}
              indicateExternal
            >
              Add your own event
            </Link>
            <p>
              Devconnect events are independently organized by the Ethereum community;{' '}
              <b>if you have a great idea for an event, we encourage you to apply using the button above!</b>
            </p>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
})

export default Schedule

// Notion fetch/format below
const notionDatabasePropertyResolver = (property: any, key: any) => {
  switch (property.type) {
    case 'text':
    case 'rich_text':
    case 'title':
      // Extract url and url text from the Location column
      if (key === 'Location' && property[property.type]) {
        let locationInfo = {} as any

        property[property.type].forEach((chunk: any) => {
          if (chunk.href) {
            locationInfo.url = chunk.href
            locationInfo.text = chunk.plain_text
          }
        })

        return locationInfo
      }

      const dechunked = property[property.type]
        ? property[property.type].reduce((acc: string, chunk: any) => {
            let textToAppend

            if (chunk.href && property.type === 'rich_text' && key !== 'URL' && key !== 'Stream URL') {
              textToAppend = `<a href=${chunk.href} target="_blank" class="generic" rel="noopener noreferrer">${chunk.plain_text}</a>`
            } else {
              textToAppend = chunk.plain_text
            }

            if (chunk.annotations) {
              let annotations = 'placeholder'

              if (chunk.annotations.bold) annotations = `<b>${annotations}</b>`
              if (chunk.annotations.italic) annotations = `<i>${annotations}</i>`
              if (chunk.annotations.strikethrough) annotations = `<s>${annotations}</s>`
              if (chunk.annotations.underline) annotations = `<u>${annotations}</u>`

              textToAppend = annotations.replace('placeholder', textToAppend)
            }

            return acc + textToAppend
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

    case 'checkbox':
      return property.checkbox

    default:
      return 'default value no handler for: ' + property.type
  }
}

const formatResult = (result: any) => {
  const properties = {} as { [key: string]: any }

  // Our schedules follow multiple formats, so we have to normalize before processing:
  const normalizedNotionEventData = normalizeEvent(result.properties)

  // Format the raw notion data into something more workable
  Object.entries(normalizedNotionEventData).forEach(([key, value]) => {
    if (typeof value === 'undefined') return

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

  // Insert a default value for time of day when unspecified
  if (!properties['Time of Day']) properties['Time of Day'] = 'ALL DAY'

  return { ...properties, raw: result }
}

export async function getStaticProps(context: any) {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  let data = {}

  const istanbulQuery = {
    database_id: '949b9d7e7fc74986b7ce03580bd4c65b',
    sorts: [
      {
        property: '[HOST] Event Date',
        direction: 'ascending',
      },
      {
        property: '[WEB] Priority (sort)',
        direction: 'descending',
      },
    ],
    filter: {
      and: [
        {
          property: '[HOST] Event Date',
          date: {
            is_not_empty: true,
          },
        },
        {
          property: '[WEB] Live',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  }

  const amsterdamQuery = {
    database_id: '8b177855e75b4964bb9f3622437f04f5',
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
  }

  let path = context.params.schedule

  if (path === 'schedule') path = 'istanbul'

  const query = (() => {
    if (path === 'amsterdam') return amsterdamQuery
    if (path === 'istanbul') return istanbulQuery

    throw 'no database provided'
  })()

  try {
    // Notion returns up to 100 results per request. We won't have that many events, but if we ever get close, add support for pagination at this step.
    const response = await notion.databases.query(query as any)

    data = response.results.map(formatResult)
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
      edition: path,
    },
    revalidate: 1 * 60 * 30, // 30 minutes, in seconds
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { schedule: 'schedule' } }, { params: { schedule: 'amsterdam' } }],
    fallback: false,
  }
}

/*
  Notion data normalization stuff below...
*/
const createKeyResolver =
  (eventData: any) =>
  (...candidateKeys: string[]) => {
    const keyMatch = candidateKeys.find(key => {
      return typeof eventData[key] !== 'undefined'
    })

    return keyMatch ? eventData[keyMatch] : undefined
  }

const normalizeEvent = (eventData: any): FormattedNotionEvent => {
  const keyResolver = createKeyResolver(eventData)

  return {
    'Stable ID': keyResolver('Stable ID', '[WEB] Stable ID'),
    Name: keyResolver('Name'),
    Organizer: keyResolver('Organizer', '[HOST] Organizer'),
    URL: keyResolver('URL', '[HOST] Event Website URL'),
    'Stream URL': keyResolver('Stream URL'),
    Date: keyResolver('Date', '[HOST] Event Date'),
    Live: keyResolver('Live', '[WEB] Live'),
    Attend: keyResolver('Attend', '[HOST] Status'),
    'Brief Description': keyResolver('Brief Description', '[HOST] Description (280 chars, tweet size)'),
    'Time of Day': keyResolver('Time of Day', '[HOST] Event Hours'),
    Category: keyResolver('Category', '[HOST] Category'),
    'Num. of Attendees': keyResolver('Num. of Attendees', '[HOST] Num. of Attendees'),
    Difficulty: keyResolver('Difficulty', '[HOST] Difficulty'),
    Location: keyResolver('Location', '[HOST] Location'),
    Thematic: keyResolver('[INT] Thematic'),
  }
}

type FormattedNotionEvent = {
  'Stable ID'?: any
  Name?: any
  Organizer?: any[]
  URL?: any
  'Stream URL'?: any
  Date?: any
  Location?: any
  Live?: any
  Attend?: any
  'Brief Description'?: any
  'Time of Day'?: any
  Category?: any
  'Num. of Attendees'?: any
  Difficulty?: any
  Thematic: any
}
