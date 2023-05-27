const management = [
  {
    path: '/management/deviceList',
    name: 'management-deviceList',
    component: () => import('@/views/management/deviceList.vue'),
    meta: {
      layout: 'content',
      resource: 'management',
    },
  },
  {
    path: '/Report',
    name: 'management-report',
    component: () => import('@/views/report/report_tag.vue'),
    meta: {
      layout: 'content',
      resource: 'management',
    },
  },
]

export default management
