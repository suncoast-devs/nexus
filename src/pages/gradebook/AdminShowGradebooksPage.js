import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Cohort } from '@/components/models'
import { GradebookPage } from './GradebookPage'

export function AdminShowGradebooksPage(props) {
  const { data: cohorts } = useModelData(() => Cohort.where({ active: true }).all())

  return cohorts
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <GradebookPage key={cohort.id} cohort_id={cohort.id} {...props} />)
}
