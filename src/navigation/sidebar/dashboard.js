import { mdiHomeOutline,mdiAccountStar,mdiViewDashboard,mdiAccountEdit  } from '@mdi/js'

export default [
  {
    title: 'Dashboards',
    icon: mdiHomeOutline,
    // badge: '3',
    badgeColor: 'warning',
    // action: 'read',
    children: [
      {
        title: 'Warehouse',
        to: 'dashboard-warehouse',
        // icon: mdiHomeOutline,
        action: 'read',
        resource: 'warehouse',
      },
      {
        title: 'Healthcare',
        to: 'dashboard-healthcare',
        action: 'read',
        resource: 'healthcare',
      },
      {
        title: 'Employee Tracking',
        to: 'dashboard-employee-tracking',
        action: 'read',
        resource: 'employeeTracking',
      },
      // {
      //   title: 'eCommerce',
      //   to: 'dashboard-eCommerce',
      // },
    ],
  },
  {
    title: 'Management',
    icon: mdiHomeOutline,
    // badge: '3',
    badgeColor: 'warning',
    children: [
      {
        title: 'Device List',
        to: 'management-deviceList',
        action: 'read',
        resource: 'management',
      },
    ],
  },
  {
    title: 'Meeting Room',
    icon: mdiViewDashboard,
    // badge: '3',
    badgeColor: 'warning',
    children: [
      {
        title: 'Overall Dashboard',
        to: 'dashboard-room-tracking',
        action: 'read',
        resource: 'roomTracking',
      },
      {
        title: 'Room List',
        to: 'dashboard-room-tracking-list',
        action: 'read',
        resource: 'roomTracking',
      },
    ],
  },
  {
    title: 'manage user',
    icon: mdiAccountEdit ,
    children: [
      {
        title: 'role',
        to: 'manage-user-role',
        action: 'manage',
        resource: 'manageUser',
      },
      {
        title: 'user',
        to: 'manage-user-user',
        action: 'manage',
        resource: 'manageUser',
      },
    ],
  },
  {
    title: 'Super Admin',
    icon: mdiAccountStar,

    children: [
      {
        title: 'customer',
        to: 'super_admin-manage-customer',
      },
      {
        title: 'role',
        to: 'super_admin-manage-role',
      },
      {
        title: 'user',
        to: 'super_admin-manage-user',
      },
    ],
  },
]
