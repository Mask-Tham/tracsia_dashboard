const porter_tracking = [
    {
      path: '/porter_tracking/dashboard',
      name: 'porter_tracking-dashboard',
      component: () => import('@/views/dashboards/porter-tracking/dashboard/PorterTrackingDashboard.vue'),
      meta: {
        layout: 'content',
        resource: 'porterTracking',
      },
    },
    {
      path: '/porter_tracking/management',
      name: 'porter_tracking-management',
      component: () => import('@/views/dashboards/porter-tracking/management/PorterTrackingManagement.vue'),
      meta: {
        layout: 'content',
        resource: 'porterTracking',
      },
    },
  ]
  
  export default porter_tracking