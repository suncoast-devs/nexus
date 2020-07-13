import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Cohort } from '@/components/models'
import GradeQueue from './GradeQueue'

const AdminShowGradeQueues = props => {
  const { data: cohorts } = useModelData(() => Cohort.where({ active: true }).all())

  return cohorts
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <GradeQueue key={cohort.id} cohort_id={cohort.id} {...props} />)
}

export default AdminShowGradeQueues
