const smartFarm = [
    {
      path: '/SmartFarmMonitoring',
      name: 'farm-monitoring-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/farm-monitoring-dashboard.vue'),
      meta: {
        layout: 'content',
        resource: 'tracbot',
      },
    },
    {
      path: '/SmartFarmDashboard',
      name: 'smart-Farm-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/smart-farm-dash.vue'),
      meta: {
        layout: 'content',
        resource: 'tracbot',
      },
    },
  ]
  
  export default smartFarm