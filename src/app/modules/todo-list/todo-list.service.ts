import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TodoTask } from 'src/app/shared/models/todo-task';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getTodoTasks(): Observable<TodoTask[]> {
    return this.httpClient.get<any>(this.apiUrl).pipe(map(
      todoTasks => {
        if (todoTasks != null && [...todoTasks].length > 0) {
          return todoTasks.map(todoTask => new TodoTask(todoTask));
        }
      }
    ));
  }

  addTodoTask(todoTask: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, todoTask);
  }

  deleteTodoTask(todoTaskId: string): Observable<any> {
    const requestUrl = `${this.apiUrl}/${todoTaskId}`;

    return this.httpClient.delete<any>(requestUrl);
  }
}
