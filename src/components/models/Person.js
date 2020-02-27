import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany } from 'spraypaint'

const Person = ApplicationRecord.extend({
  static: {
    jsonapiType: 'people',
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
    token: attr(),
    smallProfileImageUrl: attr(),
    assignmentsRepoExists: attr(),
    slackUser: attr(),
    slackInviteCode: attr(),
    cohorts: hasMany(),
    attendanceRecords: hasMany(),
    assignments: hasMany(),
  },
})

Person.prototype.isMatch = function(text) {
  const lowerText = text.toLowerCase()

  return [
    this.fullName,
    this.givenName,
    this.fullName,
    this.familyName,
    this.additionalName,
    this.github,
    this.nickname,
  ]
    .filter(Boolean)
    .some(name => name.toLowerCase().includes(lowerText))
}

export default Person
