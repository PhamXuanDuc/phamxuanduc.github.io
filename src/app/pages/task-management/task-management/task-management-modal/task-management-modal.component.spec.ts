import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementModalComponent } from './task-management-modal.component';

describe('TaskManagementModalComponent', () => {
  let component: TaskManagementModalComponent;
  let fixture: ComponentFixture<TaskManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskManagementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
