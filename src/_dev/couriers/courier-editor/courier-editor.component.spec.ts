import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierEditorComponent } from './courier-editor.component';

describe('CourierEditorComponent', () => {
  let component: CourierEditorComponent;
  let fixture: ComponentFixture<CourierEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourierEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
