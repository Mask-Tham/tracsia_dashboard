const warehouse = [
  {
    path: '/dashboards/warehouse',
    name: 'dashboard-warehouse',
    component: () => import('@/views/dashboards/warehouse/Warehouse.vue'),
    meta: {
      layout: 'content',
    },
  },
]

export default warehouse
