import auth from '@/Auth'
import icon from '@/images/icon.svg'
import Profile from '@/components/models/Profile'
import useModelData from './useModelData'

const NULL_PROFILE = {
  loading: true,
  id: 0,
  isAdmin: false,
  fullName: '',
  smallProfileImageUrl: icon
}

const useProfile = () => {
  const unAuthenticatedProfile = () => {
    return new Promise(resolve => resolve({ data: NULL_PROFILE }))
  }

  const { loading, data: fetchedProfile, reload: reloadProfile } = useModelData(() =>
    auth.isAuthenticated ? Profile.find() : unAuthenticatedProfile()
  )

  const profile = (loading ? NULL_PROFILE : fetchedProfile) || NULL_PROFILE
  const forceUpdateProfile = loading ? reloadProfile : () => {}

  return { profile, forceUpdateProfile }
}

export default useProfile
