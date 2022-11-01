const tracbot= [
    {
      path: '/tracbot/dashboard',
      name: 'tracbot-dashboard',
      component: () => import('@/views/dashboards/tracbot/dashboard/TracBotDashboard.vue'),
      meta: {
        layout: 'content',
        resource: 'tracbot',
      },
    },
    {
      path: '/tracbot/add-device',
      name: 'tracbot-add-device',
      component: () => import('@/views/dashboards/tracbot/add-device/TracBotAddDevice.vue'),
      meta: {
        layout: 'content',
        actions: 'menage',
        resource: 'tracbot',
      },
    },
  ]
  
  export default tracbot