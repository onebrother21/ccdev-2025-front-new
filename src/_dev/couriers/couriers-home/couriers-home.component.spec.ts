import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouriersHomeComponent } from './couriers-home.component';

describe('CouriersHomeComponent', () => {
  let component: CouriersHomeComponent;
  let fixture: ComponentFixture<CouriersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouriersHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouriersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
