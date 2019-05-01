import React from 'react'
import { Field, Control, Button, Section, Container, Title } from 'reactbulma'

import history from '../history'
import useProfile from '../hooks/useProfile'
import formToObject from '../utils/formToObject'
import { InputField, SelectField, TextAreaField } from './Fields'

const EditProfile = props => {
  const { profile, forceUpdateProfile } = props

  const submit = event => {
    event.preventDefault()

    const updatedProfile = formToObject(event.target, profile)

    updatedProfile.save().then(() => {
      forceUpdateProfile()
      history.push('/home')
    })
  }

  return (
    <form
      onSubmit={event => {
        submit(event)
      }}
    >
      <Section>
        <Container>
          <Title>Profile</Title>
        </Container>
        <Section>
          <Container>
            <InputField defaultObject={profile} name="fullName" />
            <InputField defaultObject={profile} name="nickname" />

            <SelectField
              defaultObject={profile}
              name="shirtSize"
              options={[
                { value: 'S', text: 'Small' },
                { value: 'M', text: 'Medium' },
                { value: 'L', text: 'Large' },
                { value: 'XL', text: 'Xtra Large' }
              ]}
            />

            <TextAreaField defaultObject={profile} name="dietaryNote" rows={4} />

            <InputField name="givenName" defaultObject={profile} />
            <InputField name="familyName" defaultObject={profile} />
            <InputField name="additionalName" defaultObject={profile} />
            <InputField name="honorificPrefix" defaultObject={profile} />
            <InputField name="honorificSuffix" defaultObject={profile} />

            <Field grouped>
              <Control>
                <Button link>Submit</Button>
              </Control>
              <Control>
                <Button>Cancel</Button>
              </Control>
            </Field>
          </Container>
        </Section>
      </Section>
    </form>
  )
}

export default EditProfile
