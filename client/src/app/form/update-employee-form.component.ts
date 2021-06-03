import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeData } from '../models/employee-data';
import { EmployeePosition } from '../models/employee-position';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDepartment } from '../models/employee-department';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './update-employee-form.html',
  styleUrls: ['./update-employee-form.css'],
})
export class FormComponent {
  employeeData: EmployeeData;
  employeeDepartments: EmployeeDepartment[];
  employeePositions: EmployeePosition[];
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$'),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(14),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
      ],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    this.activatedRoute.data.subscribe(({ resolvedEmployeeData }) => {
      this.employeeData = resolvedEmployeeData.employeeData;
      this.employeeDepartments = resolvedEmployeeData.employeeDepartments;
      this.employeePositions = resolvedEmployeeData.employeePositions;

      this.form.setValue({
        firstName: this.employeeData.firstname,
        lastName: this.employeeData.lastname,
        phone: this.employeeData.phone,
        address: this.employeeData.address,
        department: this.employeeDepartments.find(
          (employeeDepartment) =>
            employeeDepartment.department_name ===
            this.employeeData.department_name
        ),
        position: this.employeePositions.find(
          (employeePositions) =>
            employeePositions.position_name === this.employeeData.position_name
        ),
        salary: this.employeeData.salary,
      });
    });
  }

  updateEmployee() {
    if (this.form.valid) {
      this.apiService
        .updateEmployee(this.employeeData.id_user_data, {
          firstname: this.form.value.firstName,
          lastname: this.form.value.lastName,
          phone: this.form.value.phone,
          address: this.form.value.address,
          salary: this.form.value.salary,
          department: this.form.value.department.id_department,
          position: this.form.value.position.id_position,
        })
        .subscribe(() => {
          this.router.navigate(['/employees']);
          this.toastr.success('Employee successfully updated!','Success');
        });
    }
  }
}
