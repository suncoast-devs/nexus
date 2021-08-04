import React from 'react'
import { Cohort, UnProxyCollection } from '@/components/models'
import { GradeQueue } from '@/components/gradebook/GradeQueue'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'

export function AdminShowGradeQueuesPage() {
  const { profile } = useProfile()
  const {
    isLoading,
    data: cohorts = [],
    refetch,
  } = useQuery(['gradebook-cohorts', profile.dashboardCohortIds], () =>
    Cohort.includes(['student_enrollments', { homeworks: { assignments: ['homework', 'person'] } }])
      .where({
        id: profile.dashboardCohortIds,
      })
      .order('name')
      .all()
      .then(UnProxyCollection)
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      {cohorts.map(cohort => (
        <section className="section" key={cohort.id}>
          <GradeQueue cohort={cohort} refetch={refetch} />
        </section>
      ))}
    </>
  )
}
