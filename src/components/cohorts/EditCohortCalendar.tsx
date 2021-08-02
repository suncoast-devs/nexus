import React from 'react'
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import moment from 'moment'

import { Cohort, CohortDate } from '@/components/models'

type CalendarData = {
  id: string | undefined
  title: string
  allDay: boolean
  start: Date
  end: Date
}
export function EditCohortCalendar({ cohort, refetch }: { cohort: Cohort; refetch: () => void }) {
  const localizer = momentLocalizer(moment)

  function stringToDate(dateString: string) {
    return moment(dateString).toDate()
  }

  const events = cohort.cohortDates
    .map(cohortDate => ({
      id: cohortDate.id,
      title: cohortDate.description || 'Cohort Day',
      allDay: true,
      start: stringToDate(cohortDate.day),
      end: stringToDate(cohortDate.day),
    }))
    .sort()

  const deleteCohortDate = (calendarEvent: CalendarData, event: React.SyntheticEvent) => {
    const cohortDate = new CohortDate({ id: calendarEvent.id })

    cohortDate.destroy().then(refetch)
  }

  const createCohortDate = (data: SlotInfo) => {
    const cohortDate = new CohortDate()
    cohortDate.cohort_id = cohort.key()
    cohortDate.day = moment(data.start).toISOString()

    cohortDate.save().then(refetch)
  }

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        defaultDate={events[0] ? events[0].start : new Date()}
        localizer={localizer}
        onSelectEvent={deleteCohortDate}
        onSelectSlot={createCohortDate}
      />
    </div>
  )
}
