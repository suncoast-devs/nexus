import ApplicationRecord from './ApplicationRecord'
import { attr } from 'spraypaint'
import Person from './Person'

const Profile = ApplicationRecord.extend({
  static: {
    jsonapiType: 'profiles'
  },
  // The Profile attributes are the same as the person
  attrs: Person.attrs
})

export default Profile
