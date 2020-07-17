import React from 'react'

import history from '@/history'
import formToObject from '@/utils/formToObject'
import { InputField, SelectField, TextAreaField } from '@/components//utils/Fields'
import SlackInviteMessage from '@/components/home/SlackInviteMessage'

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
      <section className="section">
        <div className="container">
          <h1 className="title">Profile</h1>
        </div>
        <section className="section">
          <div className="container">
            <SlackInviteMessage profile={profile} />
            <InputField defaultObject={profile} name="fullName" />
            <InputField defaultObject={profile} name="github" />
            <SelectField
              defaultObject={profile}
              name="shirtSize"
              options={[
                { value: 'S', text: 'Small' },
                { value: 'M', text: 'Medium' },
                { value: 'L', text: 'Large' },
                { value: 'XL', text: 'Xtra Large' },
              ]}
            />
            <TextAreaField defaultObject={profile} name="dietaryNote" rows={4} />
            <InputField name="givenName" defaultObject={profile} />
            <InputField name="familyName" defaultObject={profile} />
            <InputField name="additionalName" defaultObject={profile} />
            <InputField name="honorificPrefix" defaultObject={profile} />
            <InputField name="honorificSuffix" defaultObject={profile} />
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <button className="button">Cancel</button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </form>
  )
}

export default EditProfile
