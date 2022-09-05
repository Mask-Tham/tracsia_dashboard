const user= [
    {
      path: '/user/settings',
      name: 'user-settings',
      component: () => import('@/views/user/AccountSettings.vue'),
      meta: {
        layout: 'content',
        resource: 'user',
      },
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: () => import('@/views/user/user-profile/UserProfile.vue'),
      meta: {
        layout: 'content',
        resource: 'user',
      },
    },
  ]
  
  export default user