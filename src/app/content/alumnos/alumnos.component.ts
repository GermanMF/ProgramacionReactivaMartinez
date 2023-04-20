import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';
import { AltasComponent } from '../forms/altas/altas.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditarComponent } from '../forms/editar/editar.component';
import { AlumnosService } from './services/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
  dataSource = new MatTableDataSource<Alumno>();
  

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private alumnosService: AlumnosService) {
      this.alumnosService.getAlumnos().subscribe(alumnos => {
        this.dataSource.data = alumnos;
      })
    }

  abrirAltas(): void {
    const dialog = this.matDialog.open(AltasComponent);
    dialog.afterClosed().subscribe((valor) => {
      this.add(valor);
    });
  }

  abrirEdicion(alumno: Alumno) {
    const dialog = this.matDialog.open(EditarComponent, {
      data: alumno,
    });
    dialog.afterClosed().subscribe((valor) => {
      this.modify(valor);
    });
  }

  eliminarUsuario(alumno: Alumno) {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: alumno,
    });
    dialog.disableClose = true;
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.delete(alumno);
      }
    });
  }

  add(alumno: Alumno) {
    if (alumno.firstName || alumno.lastName || alumno.online) {
      alumno = {
        ...alumno,
        id: this.dataSource.data[this.dataSource.data.length - 1].id + 1,
      };
      this.dataSource.data.push(alumno);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    }
  }

  delete(alumno: Alumno): void {
    this.dataSource.data.splice(this.dataSource.data.indexOf(alumno), 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  modify(alumno: Alumno) {
    const index = this.dataSource.data.findIndex((alumnoI) => {
      return alumnoI.id === alumno.id;
    });
    this.dataSource.data[index] = alumno;
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'update',
    'matematicas',
    'espanol',
    'cienciasNaturales',
    'civismo',
    'online',
    'accion',
  ];
  
}
