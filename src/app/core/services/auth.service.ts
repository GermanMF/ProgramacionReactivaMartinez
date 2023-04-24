import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioLogueado: string = ''
  private authUser$ = new Subject<any>();

  constructor() { }

  getAuthAlumno(): Observable<Alumno> {
    return this.authUser$.asObservable();
  }

  login(alumno: Alumno): void {
    this.authUser$.next(alumno);
  }

  enviarAdrawer(nombre: string): void {
    this.usuarioLogueado = nombre;
    this.authUser$.next(this.usuarioLogueado);
  }

}
