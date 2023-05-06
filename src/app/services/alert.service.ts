import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  succes(message: string) {
    this._openSnackBar(message, 'alert-succes');
  }

  error(message: string) {
    this._openSnackBar(message, 'alert-error');
  }

  private _openSnackBar(message: string, panelClass: string): void {
    this._snackBar.open(message, 'Close', { panelClass });
  }
}
