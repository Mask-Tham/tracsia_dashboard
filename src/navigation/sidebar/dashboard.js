import { mdiHomeOutline } from '@mdi/js'

export default [
  {
    title: 'Dashboards',
    icon: mdiHomeOutline,
    // badge: '3',
    badgeColor: 'warning',
    children: [
      {
        title: 'Warehouse',
        to: 'dashboard-warehouse',
        // icon: mdiHomeOutline,
      },
      {
        title: 'Healthcare',
        to: 'dashboard-healthcare',
        // href: '/dashboard/healthcare',

      },
      {
        title: 'Employee Tracking',
        to: 'dashboard-employee-tracking',
        // href: '/dashboard/healthcare',

      },
      // {
      //   title: 'eCommerce',
      //   to: 'dashboard-eCommerce',
      // },
    ],
  },
]
