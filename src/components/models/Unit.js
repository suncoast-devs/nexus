import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const Unit = ApplicationRecord.extend({
  static: {
    jsonapiType: 'units'
  },
  attrs: {
    cohort: belongsTo(),
    program: belongsTo(),
    cohort_id: attr(),
    program_id: attr()
  }
})

export default Unit
