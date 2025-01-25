import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourierAboutComponent } from './new-courier-about.component';

describe('NewCourierAboutComponent', () => {
  let component: NewCourierAboutComponent;
  let fixture: ComponentFixture<NewCourierAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCourierAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCourierAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
