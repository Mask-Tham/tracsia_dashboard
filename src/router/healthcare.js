const healthcare = [
    // {
    //   path: '/dashboards/healthcare',
    //   name: 'dashboard-healthcare',
    //   component: () => import('@/views/dashboards/healthcare/Healthcareoverview.vue'),
    //   meta: {
    //     layout: 'content',
    //   },
    // },
    {
        path: '/dashboards/healthcare/:id',
        name: 'dashboard-healthcare-person',
        component: () =>
            import ('@/views/dashboards/healthcare/Healthcareperson.vue'),
        meta: {
            layout: 'content',
        },
    },
]

export default healthcare