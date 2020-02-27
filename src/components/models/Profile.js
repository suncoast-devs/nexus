import { Person } from './index'

// The Profile attributes are the same as the person
const Profile = Person.extend({
  static: {
    jsonapiType: 'profiles',
  },
})

export default Profile
