import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManagementModalComponent } from './contract-management-modal.component';

describe('ContractManagementModalComponent', () => {
  let component: ContractManagementModalComponent;
  let fixture: ComponentFixture<ContractManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractManagementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
