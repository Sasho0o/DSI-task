import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UpdateEmployee } from '../models/update-employee';
import { AddEmployee } from '../models/add-employee';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getEmployeeData(): Observable<any> {
    return this.httpClient.get('api/employee');
  }

  getEmployeeById(employeeId: string): Observable<any> {
    return this.httpClient.get(`api/employee/${employeeId}`);
  }

  updateEmployee(employeeId: number, employee: UpdateEmployee) {
    return this.httpClient.put(`api/employee/${employeeId}`, employee);
  }

  addEmployee(employee: AddEmployee) {
    return this.httpClient.post(`api/employee`, employee);
  }

  deleteEmployeeById(employeeId: number): Observable<any> {
    return this.httpClient.delete(`api/employee/${employeeId}`);
  }

  getEmployeePositions(): Observable<any> {
    return this.httpClient.get('api/employee/position/all');
  }

  getEmployeeDepartments(): Observable<any> {
    return this.httpClient.get('api/employee/department/all');
  }
}
