import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskDetailComponent } from './my-task-detail.component';

describe('MyTaskDetailComponent', () => {
  let component: MyTaskDetailComponent;
  let fixture: ComponentFixture<MyTaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTaskDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
