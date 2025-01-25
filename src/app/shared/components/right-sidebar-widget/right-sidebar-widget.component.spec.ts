import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSidebarWidgetComponent } from './right-sidebar-widget.component';

describe('RightSidebarWidgetComponent', () => {
  let component: RightSidebarWidgetComponent;
  let fixture: ComponentFixture<RightSidebarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightSidebarWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RightSidebarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
