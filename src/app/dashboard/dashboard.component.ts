import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Alumno } from '../models/alumno';
import { AlumnosService } from '../content/alumnos/services/alumnos.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AlumnosComponent } from '../content/alumnos/alumnos.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy {
  showFiller = false;
  durationInSeconds = 5;

  authAlumno$: Observable<Alumno>;

  destroyed$ = new Subject<void>();
  authForm: FormGroup = new FormGroup({});

  nombreAuthControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private alumnosService: AlumnosService // public data: Alumno,
  ) // private alumnosService: AlumnosService,
  {
    this.authForm = new FormGroup({
      alumnoLogueado: this.nombreAuthControl,
    });
    this.authAlumno$ = this.authService.getAuthAlumno();
  }

  ngOnInit(): void {
    console.log(this.alumnosService.getAlumnoById(123))
  }

  openSnackBar(alumnoAutenticado: string) {
    this._snackBar.open(alumnoAutenticado);
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      this.authService.enviarAdrawer(this.nombreAuthControl.value!);
      this.openSnackBar(
        `El alumno: ${this.nombreAuthControl.value!} se logueó`
      );
    } else {
      this.openSnackBar('Error al loguear alumno');
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
