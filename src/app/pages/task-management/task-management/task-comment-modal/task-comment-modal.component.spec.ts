import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentModalComponent } from './task-comment-modal.component';

describe('TaskCommentModalComponent', () => {
  let component: TaskCommentModalComponent;
  let fixture: ComponentFixture<TaskCommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCommentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
