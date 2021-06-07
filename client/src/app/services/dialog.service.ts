import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg:string){
   return this.dialog.open(ConfirmDialogComponent,{
      width: '420px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data :{
        message : msg
      }
    });
  }
}
