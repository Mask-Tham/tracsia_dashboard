import Vue from 'vue'
import axios from '@axios'

class http {
  getAccessToken() {
    return Vue.prototype.$cookies.get('accessToken')
  }

  getRefreshToken() {
    return Vue.prototype.$cookies.get('refreshToken')
  }

  setAccessToken(accessToken) {
    Vue.prototype.$cookies.set('accessToken', accessToken)
  }

  setRefreshToken(refreshToken) {
    Vue.prototype.$cookies.set('refreshToken', refreshToken)
  }

  async getAuthenticaitonHeader() {
    const accessToken = await getAccessToken()
    // console.log(accessToken);
    return {
        'Authorization': 'Bearer ' + accessToken
    };
}

  async get(path) {
    try {
      let result = await axios.get(`${Vue.prototype.$url}${path}`, {
        headers: await getAuthenticaitonHeader(),
      })
      return result
    } catch (error) {
      if (error.response.status == 401 && error.response.data.error === 'Invalid Access Token') {
        await getNewAccessToken()
        return await axios.get(`${Vue.prototype.$url}${path}`, {
          headers: await getAuthenticaitonHeader(),
        })
      } else throw error
    }
  }

  async post(path,body){
    try {
        console.log('path');
        return await axios.post(`${Vue.prototype.$url}${path}`, body, {
            headers: await getAuthenticaitonHeader()
        })
    } catch (error) {
        if (error.response.status == 401 && error.response.data.error === 'Invalid Access Token') {
            await getNewAccessToken();
            return await axios.post(`${Vue.prototype.$url}${path}`, body, {
                headers: await getAuthenticaitonHeader()
            })
        } else throw error
    }
  }
}

export default http