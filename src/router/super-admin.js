const super_admin = [
    {
      path: '/super_admin/manage/customer',
      name: 'super_admin-manage-customer',
      component: () => import('@/views/super-admin/customer/SuperAdminManageCustomer.vue'),
      meta: {
        layout: 'content',
      },
    },
    {
      path: '/super_admin/manage/role',
      name: 'super_admin-manage-role',
      component: () => import('@/views/super-admin/role/SuperAdminManageRole.vue'),
      meta: {
        layout: 'content',
      },
    },
    {
      path: '/super_admin/manage/user',
      name: 'super_admin-manage-user',
      component: () => import('@/views/super-admin/user/SuperAdminManageUser.vue'),
      meta: {
        layout: 'content',
      },
    },
  ]
  
  export default super_admin