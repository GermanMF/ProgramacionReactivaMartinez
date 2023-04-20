import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {
    const newValue = `${value.firstName} ${value.lastName}`;
    return newValue;
  }

}
