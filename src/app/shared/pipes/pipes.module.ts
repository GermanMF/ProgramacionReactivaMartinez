import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreCompletoPipe } from './nombre-completo.pipe';
import { LocacionPipe } from './locacion.pipe';



@NgModule({
  declarations: [
    NombreCompletoPipe,
    LocacionPipe
  ],
  imports: [
    CommonModule
  ], exports: [NombreCompletoPipe, LocacionPipe]
})
export class PipesModule { }
