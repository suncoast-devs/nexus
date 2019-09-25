import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Cohort } from '@/components/models'
import Gradebook from './Gradebook'

const AdminShowGradebooks = props => {
  const { data: cohorts } = useModelData(() => Cohort.where({ active: true }).all())

  return cohorts
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <Gradebook key={cohort.id} cohort_id={cohort.id} {...props} />)
}

export default AdminShowGradebooks
