import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany } from 'spraypaint'

const Person = ApplicationRecord.extend({
  static: {
    jsonapiType: 'people'
  },
  attrs: {
    isAdmin: attr(),
    givenName: attr(),
    fullName: attr(),
    familyName: attr(),
    additionalName: attr(),
    honorificPrefix: attr(),
    honorificSuffix: attr(),
    nickname: attr(),
    assignmentsRepo: attr(),
    github: attr(),
    shirtSize: attr(),
    dietaryNote: attr(),
    issues: attr(),
    smallProfileImageUrl: attr(),
    assignmentsRepoExists: attr(),
    slackUser: attr(),
    attendanceRecords: hasMany()
  }
})

export default Person
