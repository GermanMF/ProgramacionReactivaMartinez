import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Alumno } from '../models/alumno';
// import { AlumnosService } from '../content/alumnos/services/alumnos.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy, OnInit {
  showFiller = false;
  durationInSeconds = 5;

  authAlumno$: Observable<Alumno>;
  // private authAlumnos = new BehaviorSubject<AlumnoAuth[]>([
  //   {
  //     id: 1,
  //     name: 'Pedro',
  //   },
  //   {
  //     id: 2,
  //     name: 'Juan'
  //   },
  //   {
  //     id: 3,
  //     name: 'German'
  //   }
  // ]);
  destroyed$ = new Subject<void>();
  authForm: FormGroup = new FormGroup({});
  isLoggedIn = new Subject<Alumno>();

  nombreAuthControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
  ]);

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.isLoggedIn.next({
        id: 100,
      firstName: 'Golapo',
      lastName: 'Paes',
      update: new Date(),
      matematicas: 5,
      espanol: 5,
      cienciasNaturales: 5,
      civismo: 8,
      online: false,
      })
    }, 100);

    setTimeout(() => {
      this.isLoggedIn.next({
      id: 101,
      firstName: 'Canada',
      lastName: 'Martinez',
      update: new Date(),
      matematicas: 5,
      espanol: 5,
      cienciasNaturales: 5,
      civismo: 8,
      online: false,
      })
    }, 100);
  }

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    // public data: Alumno,
    // private alumnosService: AlumnosService,
  ) {
    this.authAlumno$ = this.authService.getAuthAlumno();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(AuthError, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      if (this.nombreAuthControl.value?.indexOf("Juan")) {
        this.openSnackBar()
      }
      else{
        console.log("Perro bueno")
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboardauth.component.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class AuthError {
  snackBarRef = inject(MatSnackBarRef);
}
