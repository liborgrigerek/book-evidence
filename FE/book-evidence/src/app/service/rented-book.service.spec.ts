import { TestBed } from '@angular/core/testing';

import { RentedBookService } from './rented-book.service';

describe('RentedBookService', () => {
  let service: RentedBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentedBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
