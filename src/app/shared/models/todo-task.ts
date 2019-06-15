export class TodoTask {
    candidate: string;
    id: number;
    isCompleted: boolean;
    task: string;

    constructor(input: any) {
        this.candidate = input.candidate;
        this.id = input.id;
        this.isCompleted = input.is_completed;
        this.task = input.task;
        this.isCompleted = input.is_completed;
    }
}
