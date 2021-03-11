import React from 'react'
import { Link } from 'react-router-dom'
import { Cohort } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { CohortTable } from '../../components/cohorts/CohortTable'

export function CohortsPage() {
  const { loading, data: cohorts } = useModelData(() => Cohort.order({ start_date: 'desc' }).all())

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Cohorts
          <span className="is-pulled-right">
            <Link className="button is-link" to="/cohorts/new">
              New
            </Link>
          </span>
        </h1>
      </div>
      <CohortTable cohorts={cohorts.filter(cohort => cohort.active)} title="Active" />
      <CohortTable cohorts={cohorts.filter(cohort => !cohort.active)} title="Inactive" />
    </section>
  )
}
