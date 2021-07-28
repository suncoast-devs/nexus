import React, { useState } from 'react'

import { Cohort } from '@/components/models'
import { ErrorNotification } from '@/components/utils/ErrorNotification'
import history from '@/history'
import { formToObject } from '@/utils/formToObject'
import { EditCohortForm } from '@/components/cohorts/EditCohortForm'

export function NewCohortPage() {
  const [errors, setErrors] = useState({})
  const cohort = new Cohort({})

  const cancel = event => {
    event.preventDefault()

    history.push('/cohorts')
  }

  const submit = event => {
    event.preventDefault()

    const updatedCohort = formToObject(event.target, cohort)
    console.log({ cohort })

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
        <EditCohortForm
          cohort={cohort}
          onSubmit={event => submit(event)}
          onCancel={event => cancel(event)}
          title="New Cohort"
        />
      </div>
    </section>
  )
}
