import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { Cohort, CohortDate } from '@/components/models'
import useModelData from '@/hooks/useModelData'

const EditCohortCalendar = ({ cohort_id }) => {
  const { loading, data: cohort, reload: reloadCohort } = useModelData(() =>
    Cohort.includes('cohort_dates').find(cohort_id)
  )

  const localizer = BigCalendar.momentLocalizer(moment)
  const stringToDate = string => {
    let date = string.split('-').map(Number)
    date[1] = date[1] - 1

    return new Date(...date)
  }

  const events = loading
    ? []
    : cohort.cohortDates
        .map(cohortDate => ({
          id: cohortDate.id,
          title: cohortDate.description || 'Cohort Day',
          allDay: true,
          start: stringToDate(cohortDate.day),
          end: stringToDate(cohortDate.day),
        }))
        .sort()

  const deleteCohortDate = calendarEvent => {
    const cohortDate = new CohortDate({ id: calendarEvent.id })

    cohortDate.destroy().then(reloadCohort)
  }

  const createCohortDate = data => {
    const cohortDate = new CohortDate()
    cohortDate.cohort_id = cohort_id
    cohortDate.day = data.start

    cohortDate.save().then(reloadCohort)
  }

  return (
    <div style={{ height: '500px' }}>
      <BigCalendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        // views={allViews}
        // step={60}
        // showMultiDayTimes
        // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
        selectable
        defaultDate={events[0] ? events[0].start : new Date()}
        localizer={localizer}
        onSelectEvent={deleteCohortDate}
        onSelectSlot={createCohortDate}
      />
    </div>
  )
}

export default EditCohortCalendar
