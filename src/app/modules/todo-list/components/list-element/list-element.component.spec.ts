import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ListElementComponent } from './list-element.component';

describe('ListElementComponent', () => {
  let component: ListElementComponent;
  let fixture: ComponentFixture<ListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ ListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListElementComponent);
    component = fixture.componentInstance;

    component.id = '5707a8c6-5104-48f5-b6b5-b30941740027';
    component.title = 'Complete the Angular application';
    component.isCompleted = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task', () => {
    const compiled = fixture.debugElement.nativeElement;
    const taskElement = compiled.querySelector('li label');

    expect(taskElement.querySelector('.checkbox').checked).toBe(false);
    expect(taskElement.querySelector('.text__input').value).toBe('Complete the Angular application');
  });

  it('should emit edit form', () => {
    component.taskModified.subscribe(
      editForm => expect(editForm).toEqual(component.editTaskForm)
    );

    component.submitEditForm();
  });
});
