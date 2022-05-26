const temp = [
    {
        path:'/public-page',
        name:'public-page',
        component: () => import('@/views/pages/public-pages/PublicpageExample.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
        },
    }
]

export default temp