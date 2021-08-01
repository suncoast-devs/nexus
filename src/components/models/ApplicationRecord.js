import { SpraypaintBase } from 'spraypaint'

const ApplicationRecord = SpraypaintBase.extend({
  static: {
    baseUrl: import.meta.env.VITE_PYLON_URL,
    apiNamespace: '/api/v1',
  },
})

export default ApplicationRecord
