import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.scss']
})
export class WidgetBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  animal: string;
  name: string;

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewWidgetBarDialog, {
      width: '400px',
      height: '550px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-widget-bar-dialog',
  templateUrl: 'dialog-overview-widget-bar.html',
  styleUrls: ['./widget-bar.component.scss']
})
export class DialogOverviewWidgetBarDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewWidgetBarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}