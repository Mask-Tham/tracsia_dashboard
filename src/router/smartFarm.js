const smartFarm = [
    {
      path: '/SmartFarmMonitoring',
      name: 'farm-monitoring-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/farm-monitoring-dashboard.vue'),
      meta: {
        layout: 'content',
        actions: 'read',
        resource: 'smartMonitoring',
      },
    },
    {
      path: '/SmartFarmDashboard',
      name: 'smart-Farm-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/smart-farm-dash.vue'),
      meta: {
        layout: 'content',
        actions: 'read',
        resource: 'smartFarm',
      },
    },
    {
      path: '/SmartIndustryDashboard',
      name: 'smart-industry-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/smart-industry-dash.vue'),
      meta: {
        layout: 'content',
        actions: 'read',
        resource: 'smartIndustry',
      },
    },
    {
      path: '/SmartRetailDashboard',
      name: 'smart-retail-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/smart-retail-dash.vue'),
      meta: {
        layout: 'content',
        actions: 'read',
        resource: 'smartRetail',
      },
    },
    {
      path: '/SmartWarehouseDashboard',
      name: 'smart-warehouse-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/warehouse/Warehouse.vue'),
      meta: {
        layout: 'content',
        actions: 'read',
        resource: 'smartWareHouse',
      },
    },
    {
      path: '/ESLDashboard',
      name: 'smart-esl-dashboard',
      component: () => import('@/views/dashboards/smart-farm/dashboard/esl.vue'),
      meta: {
        layout: 'content',
        actions: 'read',
        resource: 'smartESL',
      },
    },
  ]
  
  export default smartFarm