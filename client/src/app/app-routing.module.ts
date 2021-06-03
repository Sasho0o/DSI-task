import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeFormComponent } from './add-employee-form/add-employee-form.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormComponent } from './form/update-employee-form.component';
import { UpdateEmployeeResolver } from './form/update-employee.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/addEmployee',
    component: AddEmployeeFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/:employeeId',
    component: FormComponent,
    resolve: { resolvedEmployeeData: UpdateEmployeeResolver },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
