import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/models/alumno';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.scss']
})
export class AltasComponent {

  alumnosForm: FormGroup = new FormGroup({});

  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  apellidoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);
  locacionControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Alumno,
    private dialogRef: MatDialogRef<AltasComponent>,
    private _snackBar: MatSnackBar){
    this.alumnosForm = new FormGroup({
      firstName: this.nombreControl,
      lastName: this.apellidoControl,
      online: this.locacionControl
    });
  }

  onSubmit(): void {
    if (this.alumnosForm.valid) {
      console.log("Valido");
      const newAlumno = {
        ...this.data,
        id: this.data ? this.data.id : undefined,
        firstName: this.nombreControl.value,
        lastName: this.apellidoControl.value,
        online: this.locacionControl.value==="true",
        update: new Date(),
        espanol: 0,
        matematicas: 0,
        cienciasNaturales: 0,
        civismo: 0,
      };

      this.dialogRef.close(newAlumno);
    }
  }

  

}
