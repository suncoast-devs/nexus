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
    mutation UpdateProfile($fullName: String!) {
      updateProfile(input: { fullName: $fullName }) {
        me {
          id
          fullName
        }
      }
    }
  `

  const submit = (event, updateProfile) => {
    event.preventDefault()

    const variables = {
      fullName: event.target.fullName.value
    }

    updateProfile({ variables })
  }

  const completed = () => {
    console.log('complete')
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
        isAdmin
        fullName
        smallProfileImageUrl
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
