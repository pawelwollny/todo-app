import { Component, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/shared/models/todo-task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  todoTasks: TodoTask[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  trackBy(index: number, item: TodoTask): number {
    return item.id;
  }
}
