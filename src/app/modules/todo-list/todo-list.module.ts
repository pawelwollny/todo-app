import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListElementComponent } from './components/list-element/list-element.component';

@NgModule({
  declarations: [ListComponent, ListElementComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ListComponent
  ]
})
export class TodoListModule { }
