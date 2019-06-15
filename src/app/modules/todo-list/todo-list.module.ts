import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListElementComponent } from './components/list-element/list-element.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [ ListComponent, ListElementComponent ],
  imports: [
    CommonModule
  ],
  exports: [
    ListComponent
  ]
})
export class TodoListModule { }
