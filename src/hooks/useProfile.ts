import icon from '@/images/icon.svg'
import { Profile } from '@/components/models/Profile'
import { useQuery } from 'react-query'
import { RecordProxy } from 'spraypaint/lib-esm/proxies'

const NULL_PROFILE = new Profile({ id: '0', smallProfileImageUrl: icon, dashboardCohortIds: [] })

const useProfile = () => {
  const { isLoading, data, refetch } = useQuery<RecordProxy<Profile>, Error>('profile', () =>
    Profile.includes('cohorts').find(0)
  )

  if (isLoading || !data) {
    return { profile: NULL_PROFILE, forceUpdateProfile: () => {} }
  }

  return { isLoading, profile: data.data, forceUpdateProfile: refetch }
}

export default useProfile
