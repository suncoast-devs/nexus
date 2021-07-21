import React from 'react'

import useModelData from '/src//hooks/useModelData'
import { Cohort } from '/src//components/models'
import { EditAttendancePage } from './EditAttendancePage'
import useProfile from '../../hooks/useProfile'

export function AdminShowAttendancesPage(props) {
  const { profile } = useProfile()
  const { data: cohorts } = useModelData(() => Cohort.where({ active: true }).all())

  const cohortsToShow = cohorts.filter(cohort => profile.dashboardCohortIds.includes(parseInt(cohort.id)))

  return cohortsToShow
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <EditAttendancePage key={cohort.id} cohort_id={cohort.id} {...props} />)
}
