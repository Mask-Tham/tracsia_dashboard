const healthcare = [
    {
      path: '/dashboards/healthcare',
      name: 'dashboard-healthcare',
      component: () => import('@/views/dashboards/healthcare/Healthcare.vue'),
      meta: {
        layout: 'content',
      },
    },
  ]
  
  export default healthcare