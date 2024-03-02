import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskModalComponent } from './my-task-modal.component';

describe('MyTaskModalComponent', () => {
  let component: MyTaskModalComponent;
  let fixture: ComponentFixture<MyTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTaskModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
