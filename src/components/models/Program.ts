import { ApplicationRecord } from './ApplicationRecord'
import { Model, Attr, HasMany } from 'spraypaint'
import { Unit } from '.'

export class Program extends ApplicationRecord {
  static jsonapiType = 'programs'
  @Attr() title!: string
  @Attr() identifier!: string
  @HasMany() units!: Unit[]
}
