import { NextPage } from 'next'
import React from 'react'
import { Client } from '@notionhq/client'
import css from './schedule.module.scss'
import { Header, Footer } from './index'
import moment from 'moment'
import ListIcon from 'assets/icons/list.svg'
import CalendarIcon from 'assets/icons/calendar.svg'

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
  const sortedEvents = props.events.slice().sort(sortEvents)
  const { min, max } = getEventBoundaries(sortedEvents)
  const eventDuration = calculateEventDuration(min, max)
  const placementTracker = createPlacementTracker()

  const events = sortedEvents.map((event: any) => {
    const startDay = moment(event.Date.startDate),
      endDay = moment(event.Date.endDate),
      totalDays = endDay.diff(startDay, 'days') + 1,
      offsetFromFirstDay = startDay.diff(min, 'days') + 1

    let currentRow = 1 // css property grid-row starts at 1

    /*
        1) Place at first available Y value in the start date column, filling in horizontally if multiple days
        2) If the column Y is already occupied (by another event extending into the day), increase column Y by 1, repeat until free space
          note: Horizontally there will always be room, by definition, because we are filling in left to right 
        3) Keep track of used grid slots along the way (to allow for step 2)
      */
    while (!placementTracker.placeItem(currentRow, offsetFromFirstDay, totalDays)) {
      currentRow++
    }

    const gridPlacement = {
      gridRow: currentRow + 1, // Add 1 to account for the dates occupying the first row
      gridColumn: `${offsetFromFirstDay} / span ${totalDays}`,
      '--eventLength': totalDays,
    }

    return (
      <div key={event.Name} className={css['event']} style={gridPlacement}>
        <div className={css['top']}>
          <p className={`large-text ${css['title']}`}>{event.Name}</p>
          <div className={css['when']}>
            {/* Need a data point for duration for each day; date range isnt enough */}
            <p>08:00 - 16:00</p>
          </div>
        </div>
        <div className={css['bottom']}>
          <div className={css['organizers']}>
            {event['Potential Organizer'] ? (
              // event['Potential Organizer'].map((organizer: any) => <p key={organizer}>{organizer}</p>)
              event['Potential Organizer'].join(', ')
            ) : (
              <p>Organizer</p>
            )}
          </div>

          <div className={css['meta']}>
            <div className={`${css['tag']} tiny-text`}>Working Group</div>
            <div className="tiny-text">Beginner</div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className={css['calendar']}>
      {events}

      {Array.from(Array(eventDuration)).map((_, index: number) => {
        const day = moment(sortedEvents[0].Date.startDate).add(index, 'days') // .format('MMM DD')
        const weekday = day.format('ddd')
        const date = day.format('DD')

        return (
          <div className={css['day']} key={index}>
            <p>{weekday}</p>
            <p>{date}</p>
          </div>
        )
      })}
    </div>
  )
}

const ListCalendarTableHeader = (props: any) => {
  return <div className={css['table-header']}></div>
}

const ListCalendarDayHeader = (props: any) => {
  const [open, setOpen] = React.useState(false)
  const day = props.date.format('dddd')
  const date = props.date.format('MMM DD')

  return (
    <div className={css['day-header']}>
      <div className={css['date']}>
        <p>{day}</p>
        <p>{date}</p>
      </div>

      <button className={css['toggle-open']} onClick={() => setOpen(!open)}>
        {open ? '-' : '+'}
      </button>
    </div>
  )
}

const ListCalendarEvent = (props: any) => {
  return <div>{props.event.Name}</div>
}

const ListCalendar = (props: any) => {
  const { min, max } = getEventBoundaries(props.events)
  const eventDuration = calculateEventDuration(min, max)
  const eventsByDay = React.useMemo(() => {
    const eventsByDayDict = {} as { [key: number]: any[] }

    props.events.forEach((event: any) => {
      const eventBoundaries = getEventBoundaries([event])
      const firstDay = eventBoundaries.min ? eventBoundaries.min.diff(min, 'days') : 0
      const lastDay = eventBoundaries.max ? eventBoundaries.max.diff(min, 'days') + 1 : 1

      for (let i = firstDay; i < lastDay; i++) {
        const dayIsIndexed = !!eventsByDayDict[i]

        if (dayIsIndexed) {
          eventsByDayDict[i] = [event, ...eventsByDayDict[i]]
        } else {
          eventsByDayDict[i] = [event]
        }
      }
    })

    return eventsByDayDict
  }, [min, props.events])

  return (
    <div className={css['calendar-list']}>
      {Array.from(Array(eventDuration)).map((_, index: number) => {
        const day = moment(props.events[0].Date.startDate).add(index, 'days')
        const eventsForDay = eventsByDay[index]

        return (
          <React.Fragment key={index}>
            <ListCalendarDayHeader date={day} />

            {eventsForDay.map((event: any, index: number) => {
              return <ListCalendarEvent event={event} key={index} />
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

const Schedule: NextPage = (props: any) => {
  const [scheduleView, setScheduleView] = React.useState('list')

  return (
    <div className={`${css['schedule']} section`}>
      <Header />
      <div className="clear-vertical">
        <div className={css['header-row']}>
          <h1 className="section-header">Events</h1>
          <div className={`${css['view']} small-text`}>
            <div>View:</div>
            <button
              className={`${scheduleView === 'list' && css['selected']} ${css['switch']}`}
              onClick={() => setScheduleView('list')}
            >
              <ListIcon />
              <p className={css['text']}>List</p>
            </button>
            <button
              className={`${scheduleView === 'calendar' && css['selected']} ${css['switch']}`}
              onClick={() => setScheduleView('calendar')}
            >
              <CalendarIcon />
              <p className={css['text']}>Timeline</p>
            </button>
          </div>
        </div>

        <div className={css['top-bar']}>
          <p className={css['timezone']}>12:30 CET — Central European Time (UTC/GMT +1) </p>
          {scheduleView === 'calendar' && <p className={`small-text ${css['swipe']}`}>Swipe for more →</p>}
        </div>

        {scheduleView === 'calendar' && <Calendar events={props.events} />}
        {scheduleView === 'list' && <ListCalendar events={props.events} />}
      </div>
      <Footer />
    </div>
  )
}

export default Schedule

const notionDatabasePropertyResolver = (property: any) => {
  // console.log(property.type, property)
  switch (property.type) {
    case 'text':
    case 'rich_text':
    case 'title':
      return property[property.type]?.[0]?.plain_text || null

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

    // case 'rich_text':
    //   console.log(property, 'property')

    default:
      return 'default value no handler for: ' + property.type
  }
}

const formatResult = (result: any) => {
  const properties = {} as { [key: string]: any }

  Object.entries(result.properties).forEach(([key, value]) => {
    const val = notionDatabasePropertyResolver(value)

    if (Array.isArray(val)) {
      properties[key] = val
    } else if (typeof val === 'object') {
      properties[key] = {
        ...val,
      }
    } else {
      properties[key] = val
    }
  })

  return properties
}

export async function getStaticProps() {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const databaseID = '8b177855e75b4964bb9f3622437f04f5'

  let data = {}

  try {
    // Notion returns up to 100 results per request. We won't have that many events, but if we ever get close, add support for pagination at this step.
    const response = await notion.databases.query({
      database_id: databaseID,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
      ],
      filter: {
        property: 'Date',
        date: {
          is_not_empty: true,
        },
      },
    })

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
    },
    revalidate: 1 * 60 * 30, // 30 minutes, in seconds
  }
}
