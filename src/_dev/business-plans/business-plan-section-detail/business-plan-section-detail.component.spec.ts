import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPlanSectionDetailComponent } from './business-plan-section-detail.component';

describe('BusinessPlanSectionDetailComponent', () => {
  let component: BusinessPlanSectionDetailComponent;
  let fixture: ComponentFixture<BusinessPlanSectionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPlanSectionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessPlanSectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
