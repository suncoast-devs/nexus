import React from 'react'
import { Cohort, UnProxyCollection } from '@/components/models'
import { GradebookPage } from './GradebookPage'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'

export function AdminShowGradebooksPage() {
  const { profile } = useProfile()
  const { refetch, data: cohorts = [] } = useQuery(['active-cohorts', profile.dashboardCohortIds], () =>
    Cohort.where({ active: true, id: profile.dashboardCohortIds }).all().then(UnProxyCollection)
  )

  return (
    <>
      {cohorts
        .sort(cohort => cohort.name.localeCompare(cohort.name))
        .map(cohort => (
          <GradebookPage key={cohort.id} cohort_id={cohort.key()} />
        ))}
    </>
  )
}
