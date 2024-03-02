import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanGroupModalComponent } from './loan-group-modal.component';

describe('LoanGroupModalComponent', () => {
  let component: LoanGroupModalComponent;
  let fixture: ComponentFixture<LoanGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanGroupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
