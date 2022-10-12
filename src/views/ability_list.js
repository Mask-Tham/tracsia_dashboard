const ability_list = [
  { text: 'manage-all', action: 'manage', subject: 'all', isDefault: false },
  { text: 'read-all', action: 'read', subject: 'all', isDefault: false },
  { text: 'read-Public', action: 'read', subject: 'Public', isDefault: true },
  { text: 'manage-Public', action: 'manage', subject: 'Public', isDefault: true },
  { text: 'read-management', action: 'read', subject: 'management', isDefault: false },
  { text: 'read-room-tracking', action: 'read', subject: 'roomTracking', isDefault: false },
  { text: 'read-user', action: 'read', subject: 'user', isDefault: true },
  { text: 'read-warehouse', action: 'read', subject: 'warehouse', isDefault: false },
  { text: 'read-healthcare', action: 'read', subject: 'healthcare', isDefault: false },
  { text: 'read-employee-tracking', action: 'read', subject: 'employeeTracking', isDefault: false },
  { text: 'manage-user', action: 'manage', subject: 'manageUser', isDefault: false },
  { text: 'manage-location', action: 'manage', subject: 'location', isDefault: false },
  { text: 'manage-porter-tracking', action: 'manage', subject: 'porterTracking', isDefault: false },

]

const MANAGE_ALL = 'manage-all'

const ability=''

export default ability_list
