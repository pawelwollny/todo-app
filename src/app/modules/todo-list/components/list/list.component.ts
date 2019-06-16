import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoTask } from 'src/app/shared/models/todo-task';
import { TodoListService } from '../../todo-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  addTaskForm: FormGroup;
  areInputsEnabled = true;
  todoTasks: TodoTask[];

  constructor(
    private formBuilder: FormBuilder,
    private todoListService: TodoListService
  ) { }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      id: [''],
      title: [''],
      isCompleted: false
    });

    this.getTasksFromApi();
  }

  submitForm(formGroup: FormGroup): void {
    this.addTaskForm.disable();
    this.areInputsEnabled = false;

    this.todoListService.addOrUpdateTodoTask(formGroup).subscribe(successResponse => {
      this.addTaskForm.enable();
      this.areInputsEnabled = true;
      this.getTasksFromApi();
    });
  }

  deleteTask(taskId: string): void {
    this.todoListService.deleteTodoTask(taskId).subscribe(successResponse => {
      this.getTasksFromApi();
    });
  }

  trackBy(index: number, item: TodoTask): string {
    return item.id;
  }

  private getTasksFromApi(): void {
    this.todoListService.getTodoTasks().subscribe(
      todoTasks => {
        this.todoTasks = todoTasks;
      },
      error => this.todoTasks = []
    );
  }
}
