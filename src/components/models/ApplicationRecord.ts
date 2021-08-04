import { VITE_PYLON_URL } from '@/env'
import { Model, SpraypaintBase } from 'spraypaint'

@Model()
export class ApplicationRecord extends SpraypaintBase {
  static baseUrl = VITE_PYLON_URL
  static apiNamespace = '/api/v1'
  static clientApplication: string | null = 'Nexus'

  key(): string {
    return this.id ?? this.temp_id ?? '0'
  }
}
