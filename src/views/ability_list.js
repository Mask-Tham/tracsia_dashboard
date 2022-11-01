const MANAGE_ALL = 'manage-all'
const MANAGE_PUBLIC = 'manage-public'
const MANAGE_USER = 'manage-user'
const MANAGE_LOCATION = 'manage-location'
const MANAGE_PORTER_TRACKING = 'manage-porter-tracking'

const READ_ALL = 'read-all'
const READ_PUBLIC = 'read-public'
const READ_MANAGEMENT = 'read-management'
const READ_ROOM_TRACKING = 'read-room-tracking'
const READ_USER = 'read-user'
const READ_WAREHOUSE = 'read-warehouse'
const READ_HEALTCARE = 'read-healthcare'
const READ_EMPLOYEE_TRACKING = 'read-employee-tracking'

const ability_list_manage = [
  { key: MANAGE_ALL, text: 'manage-all', action: 'manage', subject: 'all', isDefault: false },
  { key: MANAGE_PUBLIC, text: 'manage-Public', action: 'manage', subject: 'Public', isDefault: true },
  { key: MANAGE_USER, text: 'manage-user', action: 'manage', subject: 'manageUser', isDefault: false },
  { key: MANAGE_LOCATION, text: 'manage-location', action: 'manage', subject: 'location', isDefault: false },
  {
    key: MANAGE_PORTER_TRACKING,
    text: 'manage-porter-tracking',
    action: 'manage',
    subject: 'porterTracking',
    isDefault: false,
  },
]

const ability_list_read = [
  { key: READ_ALL, text: 'read-all', action: 'read', subject: 'all', isDefault: false },
  { key: READ_PUBLIC, text: 'read-Public', action: 'read', subject: 'Public', isDefault: true },
  { key: READ_MANAGEMENT, text: 'read-management', action: 'read', subject: 'management', isDefault: false },
  { key: READ_ROOM_TRACKING, text: 'read-room-tracking', action: 'read', subject: 'roomTracking', isDefault: false },
  { key: READ_USER, text: 'read-user', action: 'read', subject: 'user', isDefault: true },
  { key: READ_WAREHOUSE, text: 'read-warehouse', action: 'read', subject: 'warehouse', isDefault: false },
  { key: READ_HEALTCARE, text: 'read-healthcare', action: 'read', subject: 'healthcare', isDefault: false },
  {
    key: READ_EMPLOYEE_TRACKING,
    text: 'read-employee-tracking',
    action: 'read',
    subject: 'employeeTracking',
    isDefault: false,
  },
]

const ability_list = [...ability_list_manage, ...ability_list_read]

export const abilityKeytoArrayObj = (key) => {
  return ability_list.filter(el => key.includes(el.key))
}

const ability_obj_manage = {
  [MANAGE_ALL]: { key: MANAGE_ALL, text: 'manage-all', action: 'manage', subject: 'all', isDefault: false },
  [MANAGE_PUBLIC]: { key: MANAGE_PUBLIC, text: 'manage-public', action: 'manage', subject: 'Public', isDefault: true },
  [MANAGE_USER]: { key: MANAGE_USER, text: 'manage-user', action: 'manage', subject: 'user', isDefault: false },
  [MANAGE_LOCATION]: {
    key: MANAGE_LOCATION,
    text: 'manage-location',
    action: 'manage',
    subject: 'location',
    isDefault: false,
  },
  [MANAGE_PORTER_TRACKING]: {
    key: MANAGE_PORTER_TRACKING,
    text: 'manage-porter-tracking',
    action: 'manage',
    subject: 'porterTracking',
    isDefault: false,
  },
}

const ability_obj_read = {
  [READ_ALL]: { key: READ_ALL, text: 'read-all', action: 'read', subject: 'all', isDefault: false },
  [READ_PUBLIC]: { key: READ_PUBLIC, text: 'read-public', action: 'read', subject: 'Public', isDefault: true },
  [READ_MANAGEMENT]: {
    key: READ_MANAGEMENT,
    text: 'read-management',
    action: 'read',
    subject: 'management',
    isDefault: false,
  },
  [READ_ROOM_TRACKING]: {
    key: READ_ROOM_TRACKING,
    text: 'read-room-tracking',
    action: 'read',
    subject: 'roomTracking',
    isDefault: false,
  },
  [READ_USER]: { key: READ_USER, text: 'read-user', action: 'read', subject: 'user', isDefault: true },
  [READ_WAREHOUSE]: {
    key: READ_WAREHOUSE,
    text: 'read-warehouse',
    action: 'read',
    subject: 'warehouse',
    isDefault: false,
  },
  [READ_HEALTCARE]: {
    key: READ_HEALTCARE,
    text: 'read-healthcare',
    action: 'read',
    subject: 'employeeTracking',
    isDefault: false,
  },
  [READ_EMPLOYEE_TRACKING]: {
    key: READ_EMPLOYEE_TRACKING,
    text: 'read-employee-tracking',
    action: 'read',
    subject: 'porterTracking',
    isDefault: false,
  },
}

const ability_obj = { ...ability_obj_manage, ...ability_obj_read }

export default ability_list
