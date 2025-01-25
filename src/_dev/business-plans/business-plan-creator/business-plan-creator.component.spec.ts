import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPlanCreatorComponent } from './business-plan-creator.component';

describe('BusinessPlanCreatorComponent', () => {
  let component: BusinessPlanCreatorComponent;
  let fixture: ComponentFixture<BusinessPlanCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPlanCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessPlanCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
