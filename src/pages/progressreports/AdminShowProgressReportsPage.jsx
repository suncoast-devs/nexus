import React from 'react'

import useModelData from '@/hooks/useModelData'
import { Cohort } from '@/components/models'
import { CohortProgressReportsPage } from '@/pages/progressreports/CohortProgressReportsPage'
import useProfile from '@/hooks/useProfile'

export function AdminShowProgressReportsPage(props) {
  const { profile } = useProfile()
  const { data: cohorts } = useModelData(() => Cohort.where({ active: true }).all())

  const cohortsToShow = cohorts.filter(cohort => profile.dashboardCohortIds.includes(parseInt(cohort.id)))

  return cohortsToShow
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <CohortProgressReportsPage key={cohort.id} cohort_id={cohort.id} {...props} />)
}
