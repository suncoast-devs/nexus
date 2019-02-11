import history from './history'

class Auth {
  userProfile

  login = () => {
    window.location =
      '//localhost:3000/login?callback=http://localhost:3001/callback'
  }

  get token() {
    return localStorage.getItem('jwt')
  }

  handleAuthentication = jwt => {
    localStorage.setItem('jwt', jwt)

    window.location = '/home'
  }

  logout = () => {
    localStorage.removeItem('jwt')

    history.replace('/home')
  }

  get isAuthenticated() {
    const jwt = localStorage.getItem('jwt')

    return !!jwt
  }
}

const auth = new Auth()

export default auth
