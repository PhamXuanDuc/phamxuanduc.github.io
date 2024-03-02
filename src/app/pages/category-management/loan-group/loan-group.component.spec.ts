import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanGroupComponent } from './loan-group.component';

describe('LoanGroupComponent', () => {
  let component: LoanGroupComponent;
  let fixture: ComponentFixture<LoanGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
