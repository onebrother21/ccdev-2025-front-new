import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsHomeComponent } from './bugs-home.component';

describe('BugsHomeComponent', () => {
  let component: BugsHomeComponent;
  let fixture: ComponentFixture<BugsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BugsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
