import warehouse from './warehouse'
import healthcare from './healthcare'
import employee_tracking from './employee_tracking'

export default {
  Dashboards: 'Dashboards',
  Warehouse: "Warehouse",
  Healthcare:'Healthcare',
  'Employee Tracking':'Employee Tracing',
  warehouse:{...warehouse},
  healthcare:{...healthcare},
  employee_tracking:{...employee_tracking},

// ...warehouse,
}