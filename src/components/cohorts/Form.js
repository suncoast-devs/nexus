import React from 'react'
import { Button, Control, Title, Field } from 'reactbulma'

import { InputField } from '../Fields'

const Form = ({ onSubmit, onCancel, title, cohort, showDates }) => (
  <form onSubmit={onSubmit}>
    <Title>{title}</Title>
    <InputField defaultObject={cohort} name="name" />
    <InputField defaultObject={cohort} name="description" />
    {showDates && (
      <>
        <InputField defaultObject={cohort} name="startDate" type="date" />
        <InputField defaultObject={cohort} name="endDate" type="date" />
      </>
    )}

    <Field grouped>
      <Control>
        <Button link>Submit</Button>
      </Control>
      <Control>
        <Button onClick={onCancel}>Cancel</Button>
      </Control>
    </Field>
  </form>
)

export default Form
