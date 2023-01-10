import { VITE_LOGIN_URL } from './env'

class Auth {
  login = () => {
    const form = document.createElement('form');
    form.method = 'POST'
    form.action = VITE_LOGIN_URL;
    document.body.appendChild(form);
    form.submit();
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
