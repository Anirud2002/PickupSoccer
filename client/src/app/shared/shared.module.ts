import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckedInPipe } from '../group/pipes/checked-in.pipe';



@NgModule({
  declarations: [
    CreateGroupComponent,
    CheckedInPipe
  ],
  providers:[CheckedInPipe],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    IonicModule, 
    ReactiveFormsModule,
    CheckedInPipe
  ]
})
export class SharedModule { }
