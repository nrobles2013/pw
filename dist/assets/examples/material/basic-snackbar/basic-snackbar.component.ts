import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-basic-snackbar',
  templateUrl: './basic-snackbar.component.html',
  styleUrls: ['./basic-snackbar.component.scss']
})
export class BasicSnackbarComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
