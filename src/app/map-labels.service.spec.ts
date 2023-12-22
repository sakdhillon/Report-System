import { TestBed } from '@angular/core/testing';

import { MapLabelsService } from './map-labels.service';

describe('MapLabelsService', () => {
  let service: MapLabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapLabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
