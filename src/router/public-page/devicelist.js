const temp = [
  {
      path:'/management/deviceList/:model',
      name:'public-deviceList',
      component: () => import('@/views/management/device_page.vue'),
      meta: {
        layout: 'blank',
        resource: 'Public',
      },
  }
]

export default temp
