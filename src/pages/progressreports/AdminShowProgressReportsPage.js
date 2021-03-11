import React from 'react'

import useModelData from '@/hooks/useModelData'
import { Cohort } from '@/components/models'
import { CohortProgressReportsPage } from '@/pages/progressreports/CohortProgressReportsPage'

export function AdminShowProgressReportsPage(props) {
  const { data: cohorts } = useModelData(() => Cohort.where({ active: true }).all())

  return cohorts
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <CohortProgressReportsPage key={cohort.id} cohort_id={cohort.id} {...props} />)
}
