import React from 'react'
import { Link } from 'react-router-dom'
import { Cohort, UnProxyCollection } from '@/components/models'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { CohortTable } from '@/components/cohorts/CohortTable'
import { useQuery } from 'react-query'

export function CohortsPage() {
  const { isLoading, data: cohorts = [] } = useQuery(['cohorts'], () =>
    Cohort.order({ start_date: 'desc' }).all().then(UnProxyCollection)
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Cohorts
          <span className="is-pulled-right">
            <Link className="button is-primary" to="/cohorts/new">
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
