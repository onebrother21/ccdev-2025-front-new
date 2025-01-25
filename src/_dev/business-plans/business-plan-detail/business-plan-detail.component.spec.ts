import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPlanDetailComponent } from './business-plan-detail.component';

describe('BusinessPlanDetailComponent', () => {
  let component: BusinessPlanDetailComponent;
  let fixture: ComponentFixture<BusinessPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPlanDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
