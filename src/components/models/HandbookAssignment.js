import ApplicationRecord from './ApplicationRecord'
import { attr } from 'spraypaint'

const HandbookAssignment = ApplicationRecord.extend({
  static: {
    jsonapiType: 'handbook_assignments',
  },
  attrs: {
    name: attr(),
    body: attr(),
  },
})

export default HandbookAssignment
