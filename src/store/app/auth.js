import { initialAbility } from '@/plugins/acl/config'
import { SIGNIN, SIGNOUT } from '@/plugins/endpoint'
import router from '@/router'
import { abilityKeytoArrayObj } from '@/views/ability_list'

export default {
  namespaced: true,
  state: {
    shallContentShowOverlay: false,
  },
  getters: {
    userData() {},
    userAbility() {},
  },
  mutations: {
    TOGGLE_CONTENT_OVERLAY(state, value) {
      state.shallContentShowOverlay = value !== undefined ? value : !state.shallContentShowOverlay
    },
  },
  actions: {
    async onLogin(context, payload) {
      let res = await this._vm.$http.post(SIGNIN, payload)

      const data = res.data.data
      this._vm.$cookies.set('idToken', data.idToken)
      this._vm.$cookies.set('accessToken', data.accessToken)
      this._vm.$cookies.set('refreshToken', data.refreshToken)

      let userAbility = abilityKeytoArrayObj(data.ability)

      let userData = { ...data }
      delete userData.accessToken
      delete userData.refreshToken
      delete userData.ability
      userData.avatar = '@/assets/images/avatars/1.png'
      userData.role = userData.roleID
      userData.fullName = userData.name
      this._vm.$cookies.set('userData', userData)
      this._vm.$ability.update(userAbility)
      this._vm.$cookies.set('userAbility', JSON.stringify(userAbility))
    },
    async onLogout(context, payload) {
      let res = await this._vm.$http.post(SIGNOUT, payload)

      if (res.data.message == 'User successfully signed out'){

        this._vm.$cookies.remove('idToken')
        this._vm.$cookies.remove('accessToken')
        this._vm.$cookies.remove('refreshToken')
        this._vm.$cookies.remove('userData')
        this._vm.$cookies.remove('userAbility')
        
        // Reset ability
        this._vm.$ability.update(initialAbility)
        router.push({ name: 'auth-login' })
      }
      },
  },
}
