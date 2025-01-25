import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTaskListComponent } from './bug-task-list.component';

describe('BugTaskListComponent', () => {
  let component: BugTaskListComponent;
  let fixture: ComponentFixture<BugTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BugTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
