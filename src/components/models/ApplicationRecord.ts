import { Model, SpraypaintBase } from 'spraypaint'

@Model()
export class ApplicationRecord extends SpraypaintBase {
  static baseUrl = import.meta.env.VITE_PYLON_URL
  static apiNamespace = '/api/v1'
  static clientApplication: string | null = 'Nexus'

  key(): string {
    return this.id ?? this.temp_id ?? '0'
  }
}
