import icon from '@/images/icon.svg'
import { Profile } from '@/components/models/Profile'
import { useQuery } from 'react-query'
import { UnProxyRecord } from '@/components/models'

const NULL_PROFILE = new Profile({ id: '0', smallProfileImageUrl: icon, dashboardCohortIds: [] })

const query = () => Profile.includes('cohorts').find(0).then(UnProxyRecord)

const useProfile = () => {
  const { isLoading, data: profile = NULL_PROFILE, refetch } = useQuery('profile', query)

  return { isLoading, profile, forceUpdateProfile: refetch }
}

export default useProfile
