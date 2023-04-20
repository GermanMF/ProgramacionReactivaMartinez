import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new Subject<Alumno>();

  constructor() { }

  getAuthAlumno(): Observable<Alumno> {
    return this.authUser$.asObservable();
  }

  login(alumno: Alumno): void {
    this.authUser$.next(alumno);
  }

}
