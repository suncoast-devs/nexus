import React from 'react'

import { Cohort, UnProxyCollection } from '@/components/models'
import { CohortProgressReportsPage } from '@/pages/progressreports/CohortProgressReportsPage'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'

export function AdminShowProgressReportsPage() {
  const { profile } = useProfile()
  const { data: cohorts = [] } = useQuery(['active-cohorts', profile.dashboardCohortIds], () =>
    Cohort.where({ active: true, id: profile.dashboardCohortIds }).all().then(UnProxyCollection)
  )

  return (
    <>
      {cohorts
        .sort(cohort => cohort.name.localeCompare(cohort.name))
        .map(cohort => (
          <CohortProgressReportsPage key={cohort.id} cohort={cohort} allowNew />
        ))}
    </>
  )
}
