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
  if (!auth.isAuthenticated) {
    return NULL_PROFILE
  }

  const [loading, profile] = useModelData(() => Profile.find())

  return loading ? NULL_PROFILE : profile
}

export default useProfile
