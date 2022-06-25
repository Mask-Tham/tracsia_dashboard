import warehouse from './warehouse'
import healthcare from './healthcare'
import employee_tracking from './employee_tracking'
import device_list from './device_list'
export default {
    Dashboards: 'Dashboards',
    Warehouse: "คลังสินค้า",
    Healthcare: 'ดูแลสุขภาพ',
    'Employee Tracking': 'การติดตามพนักงาน',
    Management:'การจัดการ',
    warehouse: {...warehouse },
    healthcare: {...healthcare },
    employee_tracking: {...employee_tracking },
    device_list: {...device_list },

}
