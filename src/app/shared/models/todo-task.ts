export class TodoTask {
  candidate: string;
  id: string;
  isCompleted: number;
  task: string;

  constructor(todoTaskFromApi: any) {
    if (todoTaskFromApi != null) {
      this.candidate = todoTaskFromApi.candidate;
      this.id = todoTaskFromApi.id;
      this.isCompleted = todoTaskFromApi.is_completed;
      this.task = todoTaskFromApi.task;
    }
  }
}
