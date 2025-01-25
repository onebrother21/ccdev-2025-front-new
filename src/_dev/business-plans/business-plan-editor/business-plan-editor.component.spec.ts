import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPlanEditorComponent } from './business-plan-editor.component';

describe('BusinessPlanEditorComponent', () => {
  let component: BusinessPlanEditorComponent;
  let fixture: ComponentFixture<BusinessPlanEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPlanEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessPlanEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
