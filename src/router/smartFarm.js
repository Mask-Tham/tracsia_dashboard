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
    {
      path: '/SmartIndustryDashboard',
      name: 'smart-industry-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/smart-industry-dash.vue'),
      meta: {
        layout: 'content',
        resource: 'tracbot',
      },
    },
    {
      path: '/SmartRetailDashboard',
      name: 'smart-retail-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/smart-retail-dash.vue'),
      meta: {
        layout: 'content',
        resource: 'tracbot',
      },
    },
    {
      path: '/SmartWarehouseDashboard',
      name: 'smart-warehouse-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/warehouse/Warehouse.vue'),
      meta: {
        layout: 'content',
        resource: 'tracbot',
      },
    },
    {
      path: '/ESLDashboard',
      name: 'smart-esl-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/esl.vue'),
      meta: {
        layout: 'content',
        resource: 'tracbot',
      },
    },
  ]
  
  export default smartFarm