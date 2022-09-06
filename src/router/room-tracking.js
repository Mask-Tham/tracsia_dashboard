const room_tracking = [
    {
      path: '/dashboards/room-tracking',
      name: 'dashboard-room-tracking',
      component: () => import('@/views/dashboards/room-tracking/overview/RoomTrackingOverview.vue'),
      meta: {
        layout: 'content',
        resource: 'roomTracking',

      },
    },
    {
      path: '/dashboards/room-tracking-list',
      name: 'dashboard-room-tracking-list',
      component: () => import('@/views/dashboards/room-tracking/room-list/RoomTrackingList.vue'),
      meta: {
        layout: 'content',
        resource: 'roomTracking',

      },
    },
    {
      path: '/dashboards/room-tracking-list/booking',
      name: 'dashboard-room-tracking-list-booking',
      component: () => import('@/views/dashboards/room-tracking/room-list/RoomTrackingListBooking.vue'),
      meta: {
        layout: 'content',
        resource: 'roomTracking',

      },
    },
  ]
  
  export default room_tracking