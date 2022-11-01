const healthcare = [
  {
    path: '/dashboards/healthcare',
    name: 'dashboard-healthcare',
    component: () => import('@/views/dashboards/healthcare/HealthcareOverview.vue'),
    meta: {
      layout: 'content',
      resource: 'healthcare',
    },
  },
  {
    path: '/dashboards/healthcare/:id',
    name: 'dashboard-healthcare-person',
    component: () => import('@/views/dashboards/healthcare/Healthcareperson.vue'),
    meta: {
      layout: 'content',
      resource: 'healthcare',
    },
  },
]

export default healthcare
