import { Model } from 'spraypaint'
import { ApplicationRecord } from './ApplicationRecord'
import { Person } from '.'

@Model()
export class Profile extends Person {
  static jsonapiType = 'profiles'
}
