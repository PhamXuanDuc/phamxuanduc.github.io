import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskCommentModalComponent } from './my-task-comment-modal.component';

describe('MyTaskCommentModalComponent', () => {
  let component: MyTaskCommentModalComponent;
  let fixture: ComponentFixture<MyTaskCommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTaskCommentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
