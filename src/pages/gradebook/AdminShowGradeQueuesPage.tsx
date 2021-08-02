import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Cohort } from '@/components/models'
import { GradeQueue } from '@/components/gradebook/GradeQueue'
import useProfile from '@/hooks/useProfile'

export function AdminShowGradeQueuesPage() {
  const { profile } = useProfile()
  const { data: cohorts } = useModelData(() => Cohort.all())

  const cohortsToShow = cohorts.filter(cohort => profile.dashboardCohortIds.includes(Number(cohort.id)))

  return (
    <>
      {cohortsToShow
        .sort(cohort => cohort.name.localeCompare(cohort.name))
        .map(cohort => (
          <GradeQueue key={cohort.id} cohort_id={cohort.id} />
        ))}
    </>
  )
}
