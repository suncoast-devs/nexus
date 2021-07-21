import React from 'react'
import useModelData from '/src//hooks/useModelData'
import { Cohort } from '/src//components/models'
import { GradeQueue } from '/src//components/gradebook/GradeQueue'
import useProfile from '../../hooks/useProfile'

export function AdminShowGradeQueuesPage(props) {
  const { profile } = useProfile()
  const { data: cohorts } = useModelData(() => Cohort.all())

  const cohortsToShow = cohorts.filter(cohort => profile.dashboardCohortIds.includes(parseInt(cohort.id)))

  return cohortsToShow
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => (
      <section className="section" key={cohort.id}>
        <GradeQueue cohort_id={cohort.id} {...props} />
      </section>
    ))
}
