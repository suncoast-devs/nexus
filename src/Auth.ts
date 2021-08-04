import { VITE_LOGIN_URL } from './env'

class Auth {
  login = () => {
    window.location.replace(VITE_LOGIN_URL)
  }

  get token() {
    return localStorage.getItem('jwt')
  }

  handleAuthentication = (jwt: string) => {
    localStorage.setItem('jwt', jwt)

    window.location.pathname = '/home'
  }

  logout = () => {
    localStorage.removeItem('jwt')

    window.location.pathname = '/home'
  }

  get isAuthenticated() {
    const jwt = localStorage.getItem('jwt')

    return !!jwt
  }
}

const auth = new Auth()

export default auth
