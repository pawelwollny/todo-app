import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListElementComponent implements OnInit, OnChanges {

  @Input() id: string;
  @Input() isCompleted: number;
  @Input() areInputsEnabled: boolean;
  @Input() title: string;

  @Output() taskDeleted: EventEmitter<string> = new EventEmitter();
  @Output() taskModified: EventEmitter<FormGroup> = new EventEmitter();

  editTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editTaskForm = this.formBuilder.group({
      id: this.id,
      isCompleted: this.isCompleted,
      title: this.title
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(console.log('changes: ', changes));
    const areInputsEnabled = changes.areInputsEnabled;

    if (areInputsEnabled != null &&
        areInputsEnabled.currentValue !== areInputsEnabled.previousValue) {
        this.setInputsAccessibility();
    }
  }

  submitEditForm(): void {
    this.taskModified.emit(this.editTaskForm);
  }

  deleteTask(): void {
    this.taskDeleted.emit(this.id);
  }

  private setInputsAccessibility(): void {
    if (this.editTaskForm != null) {
      this.areInputsEnabled ? this.editTaskForm.enable() : this.editTaskForm.disable();
    }
  }
}
