import preset from '@/@core/preset/preset'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdiSvg',
  },
  breakpoint: {
    mobileBreakpoint: 'xs' // This is equivalent to a value of 960
  },
  theme: {
    options: {
      customProperties: true,
      variations: false,
    },
  },
})
