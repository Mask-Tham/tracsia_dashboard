import '@/@fake-db/db'
import { i18n } from '@/plugins/i18n'
import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import 'material-icons/iconfont/material-icons.css'
import moment from 'moment'
import Vue from 'vue'
import App from './App.vue'
import './plugins/acl'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App),
}).$mount('#app')