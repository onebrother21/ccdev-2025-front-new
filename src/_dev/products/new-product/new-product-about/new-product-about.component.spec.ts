import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductAboutComponent } from './new-product-about.component';

describe('NewProductAboutComponent', () => {
  let component: NewProductAboutComponent;
  let fixture: ComponentFixture<NewProductAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewProductAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
