import ApplicationRecord from './ApplicationRecord'
import { attr } from 'spraypaint'

const Person = ApplicationRecord.extend({
  static: {
    jsonapiType: 'people'
  },
  attrs: {
    givenName: attr(),
    fullName: attr(),
    familyName: attr(),
    additionalName: attr(),
    honorificPrefix: attr(),
    honorificSuffix: attr(),
    nickname: attr(),
    shirtSize: attr(),
    dietaryNote: attr()
  }
})

export default Person
