import axios from 'axios'
import env from '@/config/env'

class ApiClient {
  AXIOS = axios
  ENV = env

  get = async (url, { headers = {}, params = {} } = {}) => {
    return await this.#callData({ url, headers, params, method: 'get' })
  }

  post = async (url, { data = {}, headers = {}, params = {} } = {}) => {
    return await this.#callData({ url, data, headers, params, method: 'post' })
  }

  put = async (url, { data = {}, headers = {}, params = {} } = {}) => {
    return await this.#callData({ url, data, headers, params, method: 'put' })
  }

  delete = async (url, { data = {}, headers = {}, params = {} } = {}) => {
    return await this.#callData({ url, data, headers, params, method: 'delete' })
  }

  #configs = ({ headers = {}, params = {}, data = {} } = {}) => {
    const configs = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      params: {}
    }
    const CLIENT_TOKEN = this.ENV.CLIENT_TOKEN
    if (CLIENT_TOKEN) { configs.headers['client-token'] = CLIENT_TOKEN }
    const ACCESS_TOKEN = localStorage.getItem('accessToken')
    if (ACCESS_TOKEN) { configs.headers.Authorization = `Bearer ${ACCESS_TOKEN}` }

    for (const i in headers) {
      configs.headers[i] = headers[i]
    }

    for (const i in params) {
      configs.params[i] = params[i]
    }
    const BASE_URL = {
      development: this.ENV.BASE_URL,
      production: this.ENV.BASE_URL_PROD
    }

    this.AXIOS.defaults.baseURL = BASE_URL[this.ENV.NODE_ENV || 'development']

    return configs
  }

  #nextError = (err) => {
    const error = new Error('error')
    error.message = err?.message
    error.response = err?.response
    // eslint-disable-next-line no-console
    // console.clear()
    return error
  }

  #callData = async ({ url, headers, params, data = {}, method }) => {
    try {
      const configs = this.#configs({ headers, params })
      let res
      switch (method) {
        case 'get' : {
          res = await this.AXIOS.get(url, configs)
          break
        }
        case 'post' : {
          res = await this.AXIOS.post(url, data, configs)
          break
        }
        case 'put' : {
          res = await this.AXIOS.put(url, data, configs)
          break
        }
        case 'delete' : {
          res = await this.AXIOS.delete(url, configs)
          break
        }
      }
      const result = await res.data
      return result
    } catch (err) {
      throw this.#nextError(err)
    }
  }
}
const API = new ApiClient()

export { API }

export default new ApiClient()
