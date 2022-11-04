import { canNavigate } from '@/plugins/acl/routeProtection'
import Vue from 'vue'
import VueRouter from 'vue-router'
import apps from './apps'
import dashboard from './dashboard'
import pages from './pages'
import userInterface from './user-interface'
import publicPage from './public-page'
import warehouse from './warehouse'
import healthcare from './healthcare'
import employee_tracking from './employee-tracking'
import management from './management'
import super_admin from './super-admin'
import user from './user'
import room_tracking from './room-tracking'
import manage_user from './manage-user'
import tracbot from './tracbot'
import porter_tracking from './porter-tracking'
import location from './location'
import tracle from './tracle'

Vue.use(VueRouter)

const routes = [
  // ? We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    redirect: to => {
      // const userData = JSON.parse(localStorage.getItem('userData'))
      const userData = Vue.prototype.$cookies.get('userData')
      const userRole = userData && userData.role ? userData.role : null
      // console.log(userData, userRole)
      // if (userRole === 'SuperAdmin') return { name: 'dashboard-warehouse' }
      // if (userRole === 'admin') return { name: 'dashboard-warehouse' }
      // if (userRole === 'client') return { name: 'page-access-control' }
      const homePage = userData
        ? userData.homePage
          ? userData.homePage
          : 'user-profile'
        : 'auth-login'
      return { name: homePage }

      // return { name: 'page-access-control' }
      // return { name: 'user-profile' }
      // return { name: 'auth-login', query: to.query }
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error404.vue'),
    meta: {
      layout: 'blank',
      resource: 'Public',
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'blank',
      resource: 'Public',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/login-old',
    name: 'auth-login-old',
    component: () => import('@/views/LoginOld.vue'),
    meta: {
      layout: 'blank',
      resource: 'Public',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/register',
    name: 'auth-register',
    component: () => import('@/views/Register.vue'),
    meta: {
      layout: 'blank',
      resource: 'Public',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/ForgotPassword.vue'),
    meta: {
      layout: 'blank',
      resource: 'Public',
      redirectIfLoggedIn: true,
    },
  },
  ...dashboard,
  ...userInterface,
  ...publicPage,
  ...apps,
  ...pages,
  ...warehouse,
  ...healthcare,
  ...employee_tracking,
  ...management,
  ...room_tracking,
  ...tracbot,
  ...porter_tracking,
  ...location,
  ...super_admin,
  ...manage_user,
  ...user,
  ...tracle,
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

// ? Router Before Each hook: https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach((to, _, next) => {
  // const userData = localStorage.getItem('userData')
  // const isLoggedIn = userData && localStorage.getItem('accessToken') && localStorage.getItem('userAbility')

  const userData = JSON.stringify(Vue.prototype.$cookies.get('userData'))

  const accessToken = Vue.prototype.$cookies.get('accessToken')
  const userAbility = JSON.stringify(Vue.prototype.$cookies.get('userAbility'))
  console.log('userAbility', userAbility)
  // const userAbility =  localStorage.getItem('userAbility')
  const isLoggedIn = userData && accessToken && userAbility
  console.log(to)
  const canTo = to.meta.resource == 'Public' ? true : false
  // console.log('userData', userData)
  // console.log(isLoggedIn)
  // console.log(canNavigate(to))
  // console.log(!canNavigate(to))
  // console.log(!isLoggedIn)
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login', query: { marketplace: to.query.marketplace } })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })

    // return next({ name: 'misc-not-authorized' })
  }
  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    console.log('Redirect if logged in')
    next('/')
  }

  // if (!canTo) {
  //     console.log('can not to');
  //     console.log(!accessToken);
  //     if (accessToken) return next()

  //     console.log('to LOGIN');

  //     return next({ name: 'auth-login'})
  // }

  return next()
})

export default router
