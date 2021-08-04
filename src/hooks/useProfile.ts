import icon from '@/images/icon.svg'
import { Profile } from '@/components/models/Profile'
import { QueryCache, useQuery } from 'react-query'
import { UnProxyRecord } from '@/components/models'
import auth from '@/Auth'
import { queryCache } from '@/components/App'

const NULL_PROFILE = new Profile({ id: '0', smallProfileImageUrl: icon, dashboardCohortIds: [] })

const query = () => {
  console.log('net')
  return Profile.includes('cohorts').find(0).then(UnProxyRecord)
}
const useProfile = () => {
  const {
    isLoading,
    data: profile = NULL_PROFILE,
    refetch,
  } = useQuery(['profile', auth.token], query, { staleTime: 5000 })

  return { isLoading, profile, forceUpdateProfile: refetch }
}

export default useProfile
