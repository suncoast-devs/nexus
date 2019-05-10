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
  const { loading, data: profile, reload: forceUpdateProfile } = useModelData(() =>
    auth.isAuthenticated ? Profile.find() : new Promise(resolve => resolve(NULL_PROFILE))
  )

  return loading ? { profile: NULL_PROFILE, forceUpdateProfile: () => {} } : { profile, forceUpdateProfile }
}

export default useProfile
