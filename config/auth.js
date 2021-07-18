import env from './env'
const BASE_URL = {
  development: env.BASE_URL,
  production: env.BASE_URL_PROD
}[env.NODE_ENV || 'development']

export const auth = {
  cookie: false,
  redirect: {
    login: '/login',
    logout: '/',
    home: '/'
  },
  watchLoggedIn: true,
  strategies: {
    local: {
      token: {
        property: 'token',
        global: true
      },
      endpoints: {
        login: {
          url: `${BASE_URL}/login`,
          method: 'post',
          propertyName: 'access_token'
        },
        logout: {
          url: `${BASE_URL}/logout`,
          method: 'delete'
        },
        user: {
          url: `${BASE_URL}/users/profile`,
          method: 'get',
          propertyName: 'user'
        }
      }
    }
  }
}
