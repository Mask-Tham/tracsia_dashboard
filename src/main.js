import '@/@fake-db/db'
import { i18n } from '@/plugins/i18n'
import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import 'material-icons/iconfont/material-icons.css'
import moment from 'moment'
import Vue from 'vue'
import App from './App.vue'
import './plugins/acl'
import './plugins/cookies'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
// import VueCookies from 'vue-cookies'
import LottieAnimation from 'lottie-web-vue'
 
Vue.use(LottieAnimation); // add lottie-animation to your global scope
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
