import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineDirective } from './online.directive';



@NgModule({
  declarations: [
    OnlineDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [OnlineDirective]
})
export class DirectivesModule { }
