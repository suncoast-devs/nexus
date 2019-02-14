import { decorate, observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import icon from '../images/icon.svg'

import auth from '../Auth'

class Profile {
  nullProfile = {
    loading: true,
    id: 0,
    isAdmin: false,
    fullName: '',
    smallProfileImageUrl: icon
  }

  profile = observable({
    me: this.nullProfile
  })

  constructor() {
    this.fetch()
  }

  fetch = () => {
    if (!auth.isAuthenticated) {
      this.profile.me = this.nullProfile
      return
    }

    const url = process.env.REACT_APP_PYLON_URL

    const meQuery = `{
        me {
          id
          isAdmin
          fullName
          givenName
          familyName
          smallProfileImageUrl
        }
      }
    `

    const headers = {
      authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json'
    }

    const body = JSON.stringify({
      operationName: null,
      query: meQuery,
      variables: {}
    })

    const method = 'POST'

    fetch(url, { method, headers, body })
      .then(response => response.json())
      .then(response => (this.profile.me = response.data.me))
      .catch(error => (this.profile.me = this.nullProfile))
  }

  get me() {
    return this.profile.me
  }
}

decorate(Profile, { me: computed, profile: observable })

const singleton = new Profile()

export default observer(singleton)
