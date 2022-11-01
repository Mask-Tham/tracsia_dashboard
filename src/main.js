import '@/@fake-db/db'
import { i18n } from '@/plugins/i18n'
import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import './plugins/cookies'
import './plugins/acl'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import moment from 'moment'
import 'material-icons/iconfont/material-icons.css';
import axios from '@axios'
import socket from '@socket'
// import VueCookies from 'vue-cookies'
import http from './middlewares/http'

Vue.prototype.$moment = moment
Vue.prototype.$url = 'https://rbqxuvsm0e.execute-api.ap-southeast-1.amazonaws.com/'

// Vue.prototype.$http = new http

Vue.config.productionTip = false

// Vue.use(VueCookies, { expire: '7d'})

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app')
