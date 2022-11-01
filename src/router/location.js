const location = [
    {
      path: '/location',
      name: 'location',
      component: () => import('@/views/locations/Location.vue'),
      meta: {
        layout: 'content',
        resource: 'location',
      },
    },
    {
        path: '/location/info',
        name: 'location-info',
        component: () => import('@/views/locations/LocationInfo.vue'),
        meta: {
          layout: 'content',
          resource: 'location',
        },
      },
  ]
  
  export default location