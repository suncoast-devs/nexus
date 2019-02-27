import React from 'react'
import { Button, Section, Control, Container, Title, Field } from 'reactbulma'

import { InputField } from '../Fields'

const Form = props => (
  <form onSubmit={props.onSubmit}>
    <Section>
      <Container>
        <Title>{props.title}</Title>
      </Container>
      <Section>
        <Container>
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
        </Container>
      </Section>
    </Section>
  </form>
)

export default Form
