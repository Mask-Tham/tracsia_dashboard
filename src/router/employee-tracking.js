const employee_tracking = [
    {
      path: '/dashboards/employee-tracking',
      name: 'dashboard-employee-tracking',
      component: () => import('@/views/dashboards/employee-tracking/EmployeeTracking.vue'),
      meta: {
        layout: 'content',
      },
    },
  ]
  
  export default employee_tracking