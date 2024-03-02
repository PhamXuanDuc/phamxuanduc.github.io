import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportErrorAdminModalComponent } from './import-error-admin-modal.component';

describe('ImportErrorAdminModalComponent', () => {
  let component: ImportErrorAdminModalComponent;
  let fixture: ComponentFixture<ImportErrorAdminModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportErrorAdminModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportErrorAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
