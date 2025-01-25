import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPlanHomeComponent } from './business-plan-home.component';

describe('BusinessPlanHomeComponent', () => {
  let component: BusinessPlanHomeComponent;
  let fixture: ComponentFixture<BusinessPlanHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPlanHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessPlanHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
