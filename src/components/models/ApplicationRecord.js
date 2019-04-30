import { SpraypaintBase } from 'spraypaint'

const ApplicationRecord = SpraypaintBase.extend({
  static: {
    baseUrl: process.env.REACT_APP_PYLON_URL,
    apiNamespace: '/api/v1'
  }
})

export default ApplicationRecord
