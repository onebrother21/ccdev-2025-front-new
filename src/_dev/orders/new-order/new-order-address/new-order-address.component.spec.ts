import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderWizardAddressComponent } from './new-order-address.component';

describe('NewOrderWizardAddressComponent', () => {
  let component: NewOrderWizardAddressComponent;
  let fixture: ComponentFixture<NewOrderWizardAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderWizardAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewOrderWizardAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
