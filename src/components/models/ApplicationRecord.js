import { SpraypaintBase } from 'spraypaint'

const ApplicationRecord = SpraypaintBase.extend({
  static: {
    baseUrl: 'http://localhost:3000',
    apiNamespace: '/api/v1'
  }
})

export default ApplicationRecord
