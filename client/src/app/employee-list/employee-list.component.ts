import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeData } from '../models/employee-data';
import { ApiService } from '../services/api.service';

import { ViewChild} from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { DialogService } from '../services/dialog.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit  {
  displayedColumns: string[] = ['firstname', 'lastname','phone', 'address', 'department_name','position_name','salary','update','delete'];
  dataSource:any = new MatTableDataSource<EmployeeData>();

  constructor(private ApiService: ApiService, private toastr: ToastrService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.ApiService.getEmployeeData().subscribe((data) => {
      this.dataSource=data;
    });
  }

  @ViewChild(MatTable) table: MatTable<any>;

  deleteEmployee(employeeId: number,firstname: string, lastname: string) {
    this.dialogService.openConfirmDialog("Are you sure you want to delete "+firstname+" "+lastname+"'s information?")
    .afterClosed().subscribe(res =>{
      if(res){
        this.ApiService.deleteEmployeeById(employeeId).subscribe(
          (response) => {
            for (let i = 0; i < this.dataSource.length; ++i) {
              if (this.dataSource[i].id_user_data === response) {
                this.dataSource.splice(i, 1);
              }
            }
            this.table.renderRows();
            this.toastr.success('Employee successfully deleted!','Success');
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
