import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoTask } from 'src/app/shared/models/todo-task';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getTodoTasks(): Observable<TodoTask[]> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      map(
        todoTasks => {
          try {
            return todoTasks.data.map(todoTask => new TodoTask(todoTask));
          } catch (error) {
            return [];
          }
        }
      ),
    );
  }

  addOrUpdateTodoTask(formGroup: FormGroup): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('id', formGroup.get('id').value);
    formData.append('title', formGroup.get('title').value);
    formData.append('is_completed', formGroup.get('isCompleted').value ? '1' : '0');

    return this.httpClient.post<any>(this.apiUrl, formData);
  }

  deleteTodoTask(todoTaskId: string): Observable<any> {
    const requestUrl = `${this.apiUrl}/${todoTaskId}`;

    return this.httpClient.delete<any>(requestUrl);
  }
}
