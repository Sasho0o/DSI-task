import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EmployeeDataResolved } from '../models/employee-data-resolved';
import { ApiService } from '../services/api.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateEmployeeResolver implements Resolve<EmployeeDataResolved> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EmployeeDataResolved> {
    return forkJoin({
      employeeData: this.apiService.getEmployeeById(
        route.paramMap.get('employeeId')!
      ),
      employeeDepartments: this.apiService.getEmployeeDepartments(),
      employeePositions: this.apiService.getEmployeePositions(),
    });
  }
}
