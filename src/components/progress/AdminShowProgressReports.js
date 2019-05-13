import React from 'react'

import useModelData from '../../hooks/useModelData'
import { Cohort } from '../models'
import ProgressReports from './ProgressReports'

const AdminShowProgressReports = props => {
  const { data: cohorts } = useModelData(() => Cohort.active())

  return cohorts
    .sort(cohort => cohort.name.localeCompare(cohort.name))
    .map(cohort => <ProgressReports key={cohort.id} cohort_id={cohort.id} {...props} />)
}

export default AdminShowProgressReports
