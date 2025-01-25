import { TestBed } from '@angular/core/testing';

import { MapSimulatorCalcService } from './map-simulator-calc.service';

describe('MapSimulatorCalcService', () => {
  let service: MapSimulatorCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSimulatorCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
