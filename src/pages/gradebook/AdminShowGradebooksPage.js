import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Cohort } from '@/components/models'
import { GradebookPage } from './GradebookPage'
import useProfile from '../../hooks/useProfile'

export function AdminShowGradebooksPage(props) {
  const { profile } = useProfile()
  const { data: cohorts } = useModelData(() => Cohort.all())

  const cohortsToShow = cohorts.filter(cohort => profile.dashboardCohortIds.includes(parseInt(cohort.id)))

  return cohortsToShow
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <GradebookPage key={cohort.id} cohort_id={cohort.id} {...props} />)
}
