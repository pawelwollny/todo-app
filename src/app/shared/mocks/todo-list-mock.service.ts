import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { TodoTask } from '../models/todo-task';

@Injectable({
  providedIn: 'root'
})
export class TodoListMockService {

  constructor() { }

  getTodoTasks(): Observable<TodoTask[]> {
    const mockedTasks = [
      {
        id: '5707a8c6-5104-48f5-b6b5-b30941740027',
        candidate: 'szałkowska.weronika',
        task: 'Complete the Angular application',
        isCompleted: 0
      },
      {
        id: '63c7aa62-220d-4a3f-8644-f5c8b4a06029',
        candidate: 'szałkowska.weronika',
        task: 'Read the task requirements',
        isCompleted: 1
      }
    ];

    return of(mockedTasks);
  }
}
