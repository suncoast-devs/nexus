import React, { Suspense } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import { Field, Control, Button, Section, Container, Title } from 'reactbulma'

import history from '../history'
import useProfile from '../hooks/useProfile'
import formToObject from '../utils/formToObject'
import { InputField, SelectField, TextAreaField } from './Fields'

const submit = (event, updateProfileMutation) => {
  event.preventDefault()

  const variables = { profile: formToObject(event.target) }

  updateProfileMutation({
    variables,
    update: () => {
      history.push('/home')
    }
  })
}

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: ProfileInput!) {
    updateProfile(profile: $profile) {
      me {
        id
        fullName
        givenName
        familyName
        additionalName
        honorificPrefix
        honorificSuffix
        nickname
        shirtSize
        dietaryNote
      }
    }
  }
`

const ProfileForm = props => {
  const profile = useProfile()
  const updateProfileMutation = useMutation(UPDATE_PROFILE)

  return (
    <form onSubmit={event => submit(event, updateProfileMutation)}>
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

            <TextAreaField
              defaultObject={profile}
              name="dietaryNote"
              rows={4}
            />

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

const Profile = () => {
  return (
    <Suspense fallback={null}>
      <ProfileForm />
    </Suspense>
  )
}

export default Profile
