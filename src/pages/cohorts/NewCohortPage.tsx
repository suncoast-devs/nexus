import React, { useState } from 'react'

import { Cohort } from '@/components/models'
import { ErrorNotification } from '@/components/utils/ErrorNotification'
import history from '@/history'
import { formToObject } from '@/utils/formToObject'
import { EditCohortForm } from '@/components/cohorts/EditCohortForm'

export function NewCohortPage() {
  const [errors, setErrors] = useState({})
  const cohort = new Cohort({})

  function cancel() {
    history.push('/cohorts')
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const updatedCohort = formToObject(event.target, cohort)

    updatedCohort.save().then(response => {
      if (response) {
        history.push('/cohorts')
      } else {
        setErrors(cohort.errors)
      }
    })
  }

  return (
    <section className="section">
      <div className="container">
        <ErrorNotification errors={errors} onClear={() => setErrors({})} />
        <EditCohortForm cohort={cohort} onSubmit={submit} onCancel={cancel} title="New Cohort" />
      </div>
    </section>
  )
}
