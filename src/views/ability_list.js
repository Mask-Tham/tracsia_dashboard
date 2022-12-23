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
const READ_HEALTHCARE = 'read-healthcare'
const READ_EMPLOYEE_TRACKING = 'read-employee-tracking'
const READ_SMART_FARM = 'read-smart-farm'
const READ_SMART_MONITORING = 'read-smart-monitoring'
const READ_SMART_INDUSTRY = 'read-smart-industry'
const READ_SMART_RETAIL = 'read-smart-retail'
const READ_SMART_WAREHOUSE = 'read-smart-warehouse'
const READ_SMART_ESL = 'read-smart-esl'

const SUBJECT_ALL = 'all'
const SUBJECT_PUBLIC = 'Public'
const SUBJECT_MANAGEMENT = 'management'
const SUBJECT_MANAGE_USER = 'manageUser'
const SUBJECT_LOCATION = 'location'
const SUBJECT_PORTER_TRACKING = 'porterTracking'
const SUBJECT_ROOM_TRACKING = 'roomTracking'
const SUBJECT_USER = 'user'
const SUBJECT_WAREHOUSE = 'warehouse'
const SUBJECT_HEALTHCARE = 'healthcare'
const SUBJECT_EMPLOYEE_TRACKING = 'employeeTracking'
const SUBJECT_SMART_FARM = 'smartFarm'
const SUBJECT_SMART_MONITORING = 'smartMonitoring'
const SUBJECT_SMART_INDUSTRY = 'smartIndustry'
const SUBJECT_SMART_RETAIL = 'smartRetail'
const SUBJECT_SMART_WAREHOUSE = 'smartWareHouse'
const SUBJECT_SMART_ESL = 'smartESL'



const ability_list_manage = [
  { key: MANAGE_ALL, text: 'manage-all', action: 'manage', subject: SUBJECT_ALL, isDefault: false },
  { key: MANAGE_PUBLIC, text: 'manage-Public', action: 'manage', subject: SUBJECT_PUBLIC, isDefault: true },
  { key: MANAGE_USER, text: 'manage-user', action: 'manage', subject: SUBJECT_MANAGE_USER, isDefault: false },
  { key: MANAGE_LOCATION, text: 'manage-location', action: 'manage', subject: SUBJECT_LOCATION, isDefault: false },
  { key: MANAGE_PORTER_TRACKING, text: 'manage-porter-tracking', action: 'manage', subject: SUBJECT_PORTER_TRACKING, isDefault: false, },
]

const ability_list_read = [
  { key: READ_ALL, text: 'read-all', action: 'read', subject: SUBJECT_ALL, isDefault: false },
  { key: READ_PUBLIC, text: 'read-Public', action: 'read', subject: SUBJECT_PUBLIC, isDefault: true },
  { key: READ_MANAGEMENT, text: 'read-management', action: 'read', subject: SUBJECT_MANAGEMENT, isDefault: false },
  { key: READ_ROOM_TRACKING, text: 'read-room-tracking', action: 'read', subject: SUBJECT_ROOM_TRACKING, isDefault: false },
  { key: READ_USER, text: 'read-user', action: 'read', subject: SUBJECT_USER, isDefault: true },
  { key: READ_WAREHOUSE, text: 'read-warehouse', action: 'read', subject: SUBJECT_WAREHOUSE, isDefault: false },
  { key: READ_HEALTHCARE, text: 'read-healthcare', action: 'read', subject: SUBJECT_HEALTHCARE, isDefault: false },
  { key: READ_EMPLOYEE_TRACKING, text: 'read-employee-tracking', action: 'read', subject: SUBJECT_EMPLOYEE_TRACKING, isDefault: false, },
  { key: READ_SMART_FARM, text: 'read-smart-farm', action: 'read', subject: SUBJECT_SMART_FARM, isDefault: false },
  { key: READ_SMART_MONITORING, text: 'read-smart-monitoring', action: 'read', subject: SUBJECT_SMART_MONITORING, isDefault: false },
  { key: READ_SMART_INDUSTRY, text: 'read-smart-industry', action: 'read', subject: SUBJECT_SMART_INDUSTRY, isDefault: false },
  { key: READ_SMART_RETAIL, text: 'read-smart-retail', action: 'read', subject: SUBJECT_SMART_RETAIL, isDefault: false },
  { key: READ_SMART_WAREHOUSE, text: 'read-smart-warehouse', action: 'read', subject: SUBJECT_SMART_WAREHOUSE, isDefault: false },
  { key: READ_SMART_ESL, text: 'read-smart-esl', action: 'read', subject: SUBJECT_SMART_ESL, isDefault: false },
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
  [READ_HEALTHCARE]: {
    key: READ_HEALTHCARE,
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
