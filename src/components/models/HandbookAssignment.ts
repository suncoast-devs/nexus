import { ApplicationRecord } from './ApplicationRecord'
import { Attr, Model } from 'spraypaint'

@Model()
export class HandbookAssignment extends ApplicationRecord {
  static jsonapiType = 'handbook_assignments'

  @Attr() name!: string
  @Attr() body!: string
}
