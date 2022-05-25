import warehouse from './warehouse'
import healthcare from './healthcare'
import employee_tracking from './employee_tracking'

export default {
  Dashboards: 'Dashboards',
  Warehouse: "คลังสินค้า",
  Healthcare:'ดูแลสุขภาพ',
  'Employee Tracking':'การติดตามพนักงาน',
  warehouse:{...warehouse},
  healthcare:{...healthcare},
  employee_tracking:{...employee_tracking},

}