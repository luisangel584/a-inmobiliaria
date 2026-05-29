import { TestBed } from '@angular/core/testing';

import { PropertiesServiceTs } from './properties.service.ts';

describe('PropertiesServiceTs', () => {
  let service: PropertiesServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertiesServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
