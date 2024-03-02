import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementDetailComponent } from './task-management-detail.component';

describe('TaskManagementDetailComponent', () => {
  let component: TaskManagementDetailComponent;
  let fixture: ComponentFixture<TaskManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskManagementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
