import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdminAboutComponent } from './new-admin-about.component';

describe('NewAdminAboutComponent', () => {
  let component: NewAdminAboutComponent;
  let fixture: ComponentFixture<NewAdminAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAdminAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAdminAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
