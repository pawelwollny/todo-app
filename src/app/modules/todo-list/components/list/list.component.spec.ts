import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListMockService } from 'src/app/shared/mocks/todo-list-mock.service';
import { TodoListService } from '../../todo-list.service';
import { ListElementComponent } from '../list-element/list-element.component';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule ],
      declarations: [ ListComponent, ListElementComponent ],
      providers: [
        { provide: TodoListService, useClass: TodoListMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task list', () => {
    const compiled = fixture.debugElement.nativeElement;
    const taskElements = compiled.querySelectorAll('ul li label');

    expect(taskElements[0].querySelector('.checkbox').checked).toBe(false);
    expect(taskElements[0].querySelector('.text__input').value).toBe('Complete the Angular application');

    expect(taskElements[1].querySelector('.checkbox').checked).toBe(true);
    expect(taskElements[1].querySelector('.text__input').value).toBe('Read the task requirements');
  });
});
