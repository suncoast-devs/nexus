class Auth {
  userProfile

  login = () => {
    window.location = import.meta.env.VITE_LOGIN_URL
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

    window.location = '/home'
  }

  get isAuthenticated() {
    const jwt = localStorage.getItem('jwt')

    return !!jwt
  }
}

const auth = new Auth()

export default auth
