import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeData } from '../models/employee-data';
import { EmployeeDepartment } from '../models/employee-department';
import { EmployeePosition } from '../models/employee-position';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css'],
})
export class AddEmployeeFormComponent implements OnInit {
  employeeData: EmployeeData;
  employeeDepartments: EmployeeDepartment[];
  employeePositions: EmployeePosition[];
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
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
          Validators.minLength(4),
          Validators.maxLength(60),
        ],
      ],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit() {
    this.getDepartments();
    this.getPositions();
  }

  getDepartments() {
    this.apiService.getEmployeeDepartments().subscribe((data) => {
      this.employeeDepartments = data;
    });
  }

  getPositions() {
    this.apiService.getEmployeePositions().subscribe((data) => {
      this.employeePositions = data;
    });
  }

  addEmployee() {
    if (this.form.valid) {
      this.apiService
        .addEmployee({
          firstname: this.form.value.firstName,
          lastname: this.form.value.lastName,
          phone: this.form.value.phone,
          address: this.form.value.address,
          department: this.form.value.department.id_department,
          position: this.form.value.position.id_position,
          salary: this.form.value.salary,
        })
        .subscribe(() => {
          this.router.navigate(['/employees']);
          this.toastr.success('Employee successfully added!','Success');
        });
    }
  }
}
