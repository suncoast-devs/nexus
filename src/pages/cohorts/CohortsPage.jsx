import React from 'react'
import { Link } from 'react-router-dom'
import { Cohort } from '/src//components/models'
import useModelData from '/src//hooks/useModelData'
import { LoadingIndicator } from '/src//components/utils/LoadingIndicator'
import { CohortTable } from '../../components/cohorts/CohortTable'
import useProfile from '../../hooks/useProfile'

export function CohortsPage() {
  const { loading, data: cohorts } = useModelData(() => Cohort.order({ start_date: 'desc' }).all())
  const { profile, forceUpdateProfile } = useProfile()

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
      <CohortTable
        profile={profile}
        forceUpdateProfile={forceUpdateProfile}
        cohorts={cohorts.filter(cohort => cohort.active)}
        title="Active"
      />
      <CohortTable
        profile={profile}
        forceUpdateProfile={forceUpdateProfile}
        cohorts={cohorts.filter(cohort => !cohort.active)}
        title="Inactive"
      />
    </section>
  )
}
