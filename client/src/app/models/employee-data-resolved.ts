import { EmployeeData } from './employee-data';
import { EmployeeDepartment } from './employee-department';
import { EmployeePosition } from './employee-position';

export interface EmployeeDataResolved {
  employeeData: EmployeeData;
  employeeDepartments: EmployeeDepartment[];
  employeePositions: EmployeePosition[];
}
