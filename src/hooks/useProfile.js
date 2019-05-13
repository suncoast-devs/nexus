import auth from '../Auth'
import icon from '../images/icon.svg'
import Profile from '../components/models/Profile'
import useModelData from './useModelData'

const NULL_PROFILE = {
  loading: true,
  id: 0,
  isAdmin: false,
  fullName: '',
  smallProfileImageUrl: icon
}

const useProfile = () => {
  const fetchProfile = () => {
    const profile = Profile.find()

    return profile || NULL_PROFILE
  }

  const unAuthenticatedProfile = () => {
    return new Promise(resolve => resolve({ data: NULL_PROFILE }))
  }

  const { loading, data: profile, reload: forceUpdateProfile } = useModelData(() =>
    auth.isAuthenticated ? fetchProfile() : unAuthenticatedProfile()
  )

  return loading ? { profile: NULL_PROFILE, forceUpdateProfile: () => {} } : { profile, forceUpdateProfile }
}

export default useProfile
