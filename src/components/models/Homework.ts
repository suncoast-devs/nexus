import { ApplicationRecord } from './ApplicationRecord'
import { Attr, BelongsTo, HasMany, Model } from 'spraypaint'
import { Assignment, Cohort } from '.'

@Model()
export class Homework extends ApplicationRecord {
  static jsonapiType = 'homeworks'
  @Attr() name!: string
  @Attr() body!: string
  @Attr() bodyWithResolvedUrls!: string
  @Attr() summary!: string
  @Attr() title!: string
  @Attr() turnInType!: string
  @Attr() assigned!: boolean
  @Attr() reassigned!: boolean
  @Attr() assignmentsCount!: number
  @Attr() countsTowardsCompletion!: boolean
  @Attr() dueAt!: string
  @Attr() createdAt!: string

  @Attr() cohort_id!: string
  @Attr() cohortId!: string
  @BelongsTo() cohort!: Cohort
  @HasMany() assignments!: Assignment[]
}
