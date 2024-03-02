import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignModalComponent } from './campaign-modal.component';

describe('CampaignModalComponent', () => {
  let component: CampaignModalComponent;
  let fixture: ComponentFixture<CampaignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
