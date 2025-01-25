import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderWizardAccountComponent } from './new-order-account.component';

describe('NewOrderWizardAccountComponent', () => {
  let component: NewOrderWizardAccountComponent;
  let fixture: ComponentFixture<NewOrderWizardAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderWizardAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewOrderWizardAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
