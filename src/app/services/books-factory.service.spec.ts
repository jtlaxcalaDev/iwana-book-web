import { TestBed } from '@angular/core/testing';

import { BooksFactoryService } from './books-factory.service';

describe('BooksFactoryService', () => {
  let service: BooksFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
