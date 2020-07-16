import ApplicationRecord from './ApplicationRecord'
import { attr, belongsTo } from 'spraypaint'

const AssignmentEvent = ApplicationRecord.extend({
  static: {
    jsonapiType: 'assignment_events',
  },
  attrs: {
    name: attr(),
    payload: attr(),
    createdAt: attr(),
    assignmentId: attr(),
    personId: attr(),
    assignment: belongsTo(),
    person: belongsTo(),
  },
})

export default AssignmentEvent
