const manage_user= [
    {
      path: '/manage-user/role',
      name: 'manage-user-role',
      component: () => import('@/views/manage-user/role/ManageUserManageRole.vue'),
      meta: {
        layout: 'content',
        resource: 'user',
      },
    },
    {
      path: '/manage-user/user',
      name: 'manage-user-user',
      component: () => import('@/views/manage-user/user/ManageUserManageUser.vue'),
      meta: {
        layout: 'content',
        resource: 'user',
      },
    },
  ]
  
  export default manage_user