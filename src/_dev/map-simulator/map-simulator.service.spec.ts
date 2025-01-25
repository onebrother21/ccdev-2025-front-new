import { TestBed } from '@angular/core/testing';

import { MapSimulatorService } from './map-simulator.service';

describe('MapSimulatorService', () => {
  let service: MapSimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
