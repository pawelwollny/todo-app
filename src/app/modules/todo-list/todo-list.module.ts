import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ListElementComponent } from './components/list-element/list-element.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [ ListComponent, ListElementComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ListComponent
  ]
})
export class TodoListModule { }
