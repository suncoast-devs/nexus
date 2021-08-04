import { ApplicationRecord } from './ApplicationRecord'
import { Attr, HasMany, Model } from 'spraypaint'
import { Unit } from '.'

@Model()
export class Program extends ApplicationRecord {
  static jsonapiType = 'programs'
  @Attr() title!: string
  @Attr() identifier!: string
  @HasMany() units!: Unit[]
}
