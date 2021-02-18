import { TestBed } from '@angular/core/testing';

import { NewsDataServiceService } from './news-data-service.service';

describe('NewsDataServiceService', () => {
  let service: NewsDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
