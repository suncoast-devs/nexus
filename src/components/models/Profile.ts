import { Model } from 'spraypaint'
import { Person } from '.'

@Model()
export class Profile extends Person {
  static jsonapiType = 'profiles'
}
