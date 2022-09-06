import warehouse from './warehouse'
import healthcare from './healthcare'
import employee_tracking from './employee_tracking'
import device_list from './device_list'

export default {
    Dashboards: 'Dashboards',
    Warehouse: "Warehouse",
    Healthcare: 'Healthcare',
    'Employee Tracking': 'Employee Tracing',
    Management:'Management',
    "Device List":'Device List',
    'Super Admin':'Super Admin',
    customer:'Customer',
    role:'Role',
    user:'User',
    'manage user':'manage user',
    'Meeting Room':'Meeting Room',
    'Room List':'Room List',
    'Overall Dashboard':'Overall Dashboard',
    warehouse: {...warehouse },
    healthcare: {...healthcare },
    employee_tracking: {...employee_tracking },
    device_list: {...device_list },

    // ...warehouse,
}
