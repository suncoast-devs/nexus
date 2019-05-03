import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const CohortDate = ApplicationRecord.extend({
  static: {
    jsonapiType: 'cohort_dates'
  },
  attrs: {
    cohort_id: attr(),
    cohort: belongsTo(),
    day: attr(),
    description: attr()
  }
})

export default CohortDate
