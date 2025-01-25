import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSimulatorComponent } from './map-simulator.component';

describe('MapSimulatorComponent', () => {
  let component: MapSimulatorComponent;
  let fixture: ComponentFixture<MapSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
