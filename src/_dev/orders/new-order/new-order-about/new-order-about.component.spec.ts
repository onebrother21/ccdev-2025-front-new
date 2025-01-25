import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderAboutComponent } from './new-order-about.component';

describe('NewOrderAboutComponent', () => {
  let component: NewOrderAboutComponent;
  let fixture: ComponentFixture<NewOrderAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrderAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewOrderAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
