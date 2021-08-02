import React from 'react'

import { Cohort, UnProxyCollection } from '@/components/models'
import { EditAttendancePage } from './EditAttendancePage'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'

export function AdminShowAttendancesPage() {
  const { profile } = useProfile()

  const { refetch, data: cohorts = [] } = useQuery(['active-cohorts', profile.dashboardCohortIds], () =>
    Cohort.where({ active: true, id: profile.dashboardCohortIds }).all().then(UnProxyCollection)
  )

  return (
    <>
      {cohorts
        .sort(cohort => cohort.name.localeCompare(cohort.name))
        .map(cohort => (
          <EditAttendancePage key={cohort.id} cohort={cohort} refetch={refetch} />
        ))}
    </>
  )
}
