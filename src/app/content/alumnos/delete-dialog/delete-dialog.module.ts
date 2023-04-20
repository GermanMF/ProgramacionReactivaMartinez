import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports:[DeleteDialogComponent]
})
export class DeleteDialogModule { }
