import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUsersComponent } from './save-users.component';
import { ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    SaveUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SaveUsersComponent
  ]
})
export class SaveUsersModule { }
