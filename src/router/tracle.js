const tracle = [
  {
    path: '/tracle/dashboard',
    name: 'tracle-dashboard',
    component: () => import('@/views/dashboards/tracle/dashboard/TracleDashboard.vue'),
    meta: {
      layout: 'content',
      resource: 'tracle',
    },
  },
  {
    path: '/tracle/:bu/dashboard',
    name: 'tracle-group-dashboard',
    component: () => import('@/views/dashboards/tracle/group/TracleGroupDashboard.vue'),
    meta: {
      layout: 'content',
      resource: 'tracle',
    },
  },
]

export default tracle
