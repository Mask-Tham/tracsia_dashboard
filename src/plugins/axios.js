// axios
import axios from 'axios'
import Vue from 'vue'
import { initialAbility } from '@/plugins/acl/config'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://tracsia.work/',
  // timeout: 1000,
  // headers: {'Content-Type': 'application/json',}
  // {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(
  config => {
    // Do something before request is sent

    // const accessToken = localStorage.getItem('accessToken')
    const accessToken = Vue.prototype.$cookies.get('accessToken')
    const idToken = Vue.prototype.$cookies.get('idToken')

    // console.log(accessToken);
    // eslint-disable-next-line no-param-reassign
    if (idToken) config.headers.Authorization = `Bearer ${idToken}`
    // config.headers['Content-Type']= 'application/json'

    return config
  },
  error => Promise.reject(error),
)

axiosIns.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response.data?.message)
    if (error.response.data?.message == 'Unauthorized') {
      console.log('Unauthorized')
      localStorage.removeItem('userAbility')

      Vue.prototype.$cookies.remove('accessToken')
      Vue.prototype.$cookies.remove('refreshToken')
      Vue.prototype.$cookies.remove('idToken')
      Vue.prototype.$cookies.remove('userData')
      Vue.prototype.$cookies.remove('userAbility')

      // Reset ability
      Vue.prototype.$ability.update(initialAbility)
      Vue.prototype.$route.push({ name: 'auth-login' })
    }
    return Promise.reject(error.response)
  },
)

Vue.prototype.$http = axiosIns

export default axiosIns
