import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTaskDetailsComponent } from './bug-task-details.component';

describe('BugTaskDetailsComponent', () => {
  let component: BugTaskDetailsComponent;
  let fixture: ComponentFixture<BugTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugTaskDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BugTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
