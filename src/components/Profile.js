import React from 'react'
import history from '../history'
import gql from 'graphql-tag'
import QueryContainer from '../containers/QueryContainer'
import { Mutation } from 'react-apollo'
import {
  Button,
  Section,
  Container,
  Heading,
  Form
} from 'react-bulma-components/full'

const ProfileForm = props => {
  const UPDATE_PROFILE = gql`
    mutation UpdateProfile($profile: ProfileInput!) {
      updateProfile(profile: $profile) {
        me {
          id
          fullName
          givenName
          familyName
        }
      }
    }
  `

  const submit = (event, updateProfile) => {
    event.preventDefault()

    const profile = {
      profile: {
        fullName: event.target.fullName.value,
        givenName: event.target.givenName.value,
        familyName: event.target.familyName.value
      }
    }

    updateProfile({ variables: profile })
  }

  const completed = () => {
    history.push('/home')
  }

  return (
    <Mutation mutation={UPDATE_PROFILE} onCompleted={completed}>
      {updateProfile => (
        <form onSubmit={event => submit(event, updateProfile)}>
          <Section>
            <Container>
              <Heading>Profile</Heading>
            </Container>
            <Section>
              <Container>
                <Form.Field>
                  <Form.Label>Name</Form.Label>
                  <Form.Control>
                    <input
                      className="input"
                      name="fullName"
                      defaultValue={props && props.me && props.me.fullName}
                      type="text"
                      placeholder="Full Name"
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Form.Label>Given Name</Form.Label>
                  <Form.Control>
                    <input
                      className="input"
                      name="givenName"
                      defaultValue={props && props.me && props.me.givenName}
                      type="text"
                      placeholder="Given Name"
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Form.Label>Family Name</Form.Label>
                  <Form.Control>
                    <input
                      className="input"
                      name="familyName"
                      defaultValue={props && props.me && props.me.familyName}
                      type="text"
                      placeholder="Family Name"
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field kind="group">
                  <Form.Control>
                    <Button color="link">Submit</Button>
                  </Form.Control>
                  <Form.Control>
                    <Button>Cancel</Button>
                  </Form.Control>
                </Form.Field>
              </Container>
            </Section>
          </Section>
        </form>
      )}
    </Mutation>
  )
}

const Profile = _ => {
  const query = `
    {
      me {
        id
        fullName
        givenName
        familyName
      }
    }
    `

  return (
    <QueryContainer query={query}>
      <ProfileForm />
    </QueryContainer>
  )
}

export default Profile
