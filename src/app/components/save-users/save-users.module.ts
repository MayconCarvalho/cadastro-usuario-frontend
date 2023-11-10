import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveUsersComponent } from './save-users.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    SaveUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule
  ],
  exports: [
    SaveUsersComponent
  ]
})
export class SaveUsersModule { }
