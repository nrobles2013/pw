import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
// import { any } from '../basic-dialog.component';

@Component({
  selector: 'app-basic-dialog-overview',
  templateUrl: './basic-dialog-overview.component.html',
  styleUrls: ['./basic-dialog-overview.component.scss']
})
export class BasicDialogOverviewComponent{

  constructor(
    public dialogRef: MatDialogRef<BasicDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
