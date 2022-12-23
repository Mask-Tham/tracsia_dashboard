import {
  mdiCogs,
  mdiShoppingOutline,
  mdiSprout,
  mdiStorefrontOutline,
  mdiTractorVariant,
  mdiWarehouse,
  mdiHomeOutline,
  mdiOfficeBuildingMarker,
  mdiViewDashboard,
  mdiAccountEdit,
  mdiAccountStar,
} from '@mdi/js'

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
    title: 'Location',
    icon: mdiOfficeBuildingMarker,
    children: [
      {
        title: 'Location',
        to: 'location',
        action: 'management',
        resource: 'location',
      },
    ],
  },
  {
    title: 'Meeting Room',
    icon: mdiViewDashboard,
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
    title: 'TracBot',
    icon: mdiViewDashboard,
    children: [
      {
        title: 'Dashboard',
        to: 'tracbot-dashboard',
        action: 'read',
        resource: 'tracbot',
      },
      {
        title: 'Add Device',
        to: 'tracbot-add-device',
        action: 'manage',
        resource: 'tracbot',
      },
    ],
  },
  {
    title: 'Porter Tracking',
    icon: mdiViewDashboard,
    children: [
      {
        title: 'Dashboard',
        to: 'porter_tracking-dashboard',
        action: 'read',
        resource: 'porterTrackinga',
      },
      {
        title: 'Porter Management',
        to: 'porter_tracking-management',
        action: 'read',
        resource: 'porterTrackinga',
      },
    ],
  },
  {
    title: 'Tracle',
    icon: mdiViewDashboard,
    children: [
      {
        title: 'Dashboard',
        to: 'tracle-dashboard',
        action: 'read',
        resource: 'tracle',
      },
    ],
  },
  {
    title: 'manage user',
    icon: mdiAccountEdit,
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
  {
    icon: mdiTractorVariant,
    title: 'Smart Farm',
    to: 'smart-Farm-dashboard',
    action: 'read',
    resource: 'smartFarm',
  },
  {
    icon: mdiSprout,
    title: 'Smart Monitoring Farm',
    to: 'farm-monitoring-dashboard',
    action: 'read',
    resource: 'smartMonitoring',
  },
  {
    icon: mdiCogs,
    title: 'Smart Industry',
    to: 'smart-industry-dashboard',
    action: 'read',
    resource: 'smartIndustry',
  },
  {
    icon: mdiStorefrontOutline,
    title: 'Smart Retail',
    to: 'smart-retail-dashboard',
    action: 'read',
    resource: 'smartRetail',
  },
  {
    icon: mdiWarehouse,
    title: 'Smart Warehouse',
    to: 'smart-warehouse-dashboard',
    action: 'read',
    resource: 'smartWareHouse',
  },
  {
    icon: mdiShoppingOutline,
    title: 'Smart Store',
    to: 'smart-esl-dashboard',
    action: 'read',
    resource: 'smartESL',
  },
]
