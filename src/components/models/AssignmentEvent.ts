import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, BelongsTo } from 'spraypaint'
import { Assignment, Person } from '.'

@Model()
export class AssignmentEvent extends ApplicationRecord {
  static jsonapiType = 'assignment_events'

  @Attr() name!: string
  @Attr() payload!: string
  @Attr() createdAt!: string
  @Attr() assignmentId!: string
  @Attr() personId!: string
  @Attr() uploadsSignedIds!: number[]

  @BelongsTo() assignment: Assignment
  @BelongsTo() person: Person
}
