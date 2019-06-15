import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TodoTask } from 'src/app/shared/models/todo-task';
import { TodoListService } from './todo-list.service';

let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy };
let todoListService: TodoListService;

describe('TodoListService', () => {
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        TodoListService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    todoListService = TestBed.get(TodoListService);
    httpClientSpy = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(todoListService).toBeTruthy();
  });

  it('should get tasks list', () => {
    const mockData: any = [
      {
        id: '5707a8c6-5104-48f5-b6b5-b30941740027',
        candidate: 'szałkowska.weronika',
        task: 'Complete the Angular application',
        is_completed: 0
      },
      {
        id: '63c7aa62-220d-4a3f-8644-f5c8b4a06029',
        candidate: 'szałkowska.weronika',
        task: 'Read the task requirements',
        is_completed: 0
      }
    ];

    const expectedTasks: TodoTask[] = [
      new TodoTask(mockData[0]),
      new TodoTask(mockData[1])
    ];

    httpClientSpy.get.and.returnValue(of(mockData));

    todoListService.getTodoTasks().subscribe(tasks => {
      expect(tasks).toEqual(expectedTasks, 'check todo tasks');
    });
  });

  it('should return 404 error on get', () => {
    const errorResponse = new HttpErrorResponse({
      error: {
        message: 'Items Not Found',
        status: 'error',
        title: ''
      },
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    todoListService.getTodoTasks().subscribe(
      tasks => fail('error expected'),
      error => expect(error.error.message).toBe('Items Not Found', 'error message check')
    );
  });

  it('should add task', () => {
    const taskToAdd = {
      id: '5707a8c6-5104-48f5-b6b5-b30941740027',
      candidate: 'szałkowska.weronika',
      task: 'Complete the Angular application',
      is_completed: 0
    };
    const mockedResponse = {
      'status': 'success',
      'data': [{
        'id': '5707a8c6-5104-48f5-b6b5-b30941740027',
        'task': 'Complete the Angular application',
        'is_completed': 0
      }]
    };

    httpClientSpy.post.and.returnValue(of(mockedResponse));

    todoListService.addTodoTask(taskToAdd).subscribe(
      successResponse => {
        expect(successResponse.status).toBe('success', 'response status check');
        expect(taskToAdd).toEqual(jasmine.objectContaining(successResponse.data[0]), 'object in post response check');
      }
    );
  });

  it('should return error 405 on add', () => {
    const taskToAdd = {};
    const errorResponse = new HttpErrorResponse({
      status: 405
    });

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    todoListService.addTodoTask(taskToAdd).subscribe(
      successResponse => fail('error expected'),
      error => expect(error.status).toBe(405)
    );
  });

  it('should delete task', () => {
    const taskId = '5707a8c6-5104-48f5-b6b5-b30941740027';
    const mockedResponse = {
      'status': 'success',
      'data': {
        'id': '5707a8c6-5104-48f5-b6b5-b30941740027'
      }
    };

    httpClientSpy.delete.and.returnValue(of(mockedResponse));

    todoListService.deleteTodoTask(taskId).subscribe(successResponse => {
      expect(successResponse.status).toBe('success', 'success status in delete response check');
      expect(successResponse.data.id).toBe(taskId, 'id in delete response object check');
    });
  });

  it('should return error 404 on delete', () => {
    const taskId = '5707a8c6-5104-48f5-b6b5-b30941740027';
    const errorResponse = new HttpErrorResponse({
      status: 404
    });

    httpClientSpy.delete.and.returnValue(throwError(errorResponse));

    todoListService.deleteTodoTask(taskId).subscribe(
      successResponse => fail('error expected'),
      error => expect(error.status).toBe(404)
    );
  });

  it('should return error 405 on delete', () => {
    const taskId = '5707a8c6-5104-48f5-b6b5-b30941740027';
    const errorResponse = new HttpErrorResponse({
      status: 405
    });

    httpClientSpy.delete.and.returnValue(throwError(errorResponse));

    todoListService.deleteTodoTask(taskId).subscribe(
      successResponse => fail('error expected'),
      error => expect(error.status).toBe(405)
    );
  });
});
