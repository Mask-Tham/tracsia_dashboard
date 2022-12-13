import { mdiCheckboxBlankCircleOutline } from '@mdi/js'
const themeStyle = require('./themeStyle')

const themeConfig = {
  app: {
    name: 'Tracsia',
    logo: require('@/assets/images/svg/25_1.png'),
    // logo: require('@/assets/images/pages/aviato.png'),

    isDark: false,
    isRtl: false,
    contentLayoutNav: 'vertical', // vertical, horizontal
    routeTransition: 'scroll-x-transition', // https://vuetifyjs.com/en/styles/transitions/#api
    // ! `semi-dark` isn't available for horizontal nav menu
    skinVariant: 'default', // default, bordered, semi-dark
    contentWidth: 'full', //full, boxed
  },
  menu: {
    isMenuHidden: false,
    isVerticalNavMini: true,
    verticalMenuAccordion: true,
    groupChildIcon: mdiCheckboxBlankCircleOutline,
    horizontalNavMenuGroupOpenOnHover: true,
  },
  appBar: {
    /*
    ! In Content Layout Horizontal Nav type `hidden` value won't work
    ! In Content Layout Horizontal Nav type value of `type` will affect both Appbar and Horizontal Navigation Menu
    */
    type: 'fixed', // fixed, static, hidden
    isBlurred: true,
  },
  footer: {
    type: 'static', // fixed, static, hidden
  },
  themes: {
    light: {
      ...themeStyle.themeStyle.themes.light,
    },
    dark: {
      ...themeStyle.themeStyle.themes.dark,
    },
  },
}

export default themeConfig
