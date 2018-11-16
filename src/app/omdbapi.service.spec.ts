import { TestBed } from '@angular/core/testing';

import { OmdbapiService } from './omdbapi.service';

describe('OmdbapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmdbapiService = TestBed.get(OmdbapiService);
    expect(service).toBeTruthy();
  });
});
