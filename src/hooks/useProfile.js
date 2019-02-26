import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import auth from '../Auth'
import icon from '../images/icon.svg'

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

  const meQuery = gql`
    {
      me {
        id
        isAdmin
        fullName
        givenName
        familyName
        additionalName
        honorificPrefix
        honorificSuffix
        nickname
        shirtSize
        dietaryNote
        smallProfileImageUrl
      }
    }
  `

  const {
    data: { me }
  } = useQuery(meQuery, { suspend: true })

  return me
}

export default useProfile
