import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugTaskEditorComponent } from './bug-task-editor.component';

describe('BugTaskEditorComponent', () => {
  let component: BugTaskEditorComponent;
  let fixture: ComponentFixture<BugTaskEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugTaskEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BugTaskEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
