import React from 'react'
import { Button, Control, Title, Field } from 'reactbulma'

import { InputField } from '../Fields'

const Form = props => (
  <form onSubmit={props.onSubmit}>
    <Title>{props.title}</Title>
    <InputField defaultObject={props.cohort} name="name" />
    <InputField defaultObject={props.cohort} name="description" />

    <Field grouped>
      <Control>
        <Button link>Submit</Button>
      </Control>
      <Control>
        <Button onClick={props.onCancel}>Cancel</Button>
      </Control>
    </Field>
  </form>
)

export default Form
