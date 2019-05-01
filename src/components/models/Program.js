import ApplicationRecord from './ApplicationRecord'
import { attr, hasMany } from 'spraypaint'

const Program = ApplicationRecord.extend({
  static: {
    jsonapiType: 'programs'
  },
  attrs: {
    title: attr(),
    identifier: attr(),
    units: hasMany()
  }
})

export default Program
