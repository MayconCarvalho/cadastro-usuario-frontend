import { TestBed } from '@angular/core/testing';

import { SaveUsersService } from './save-users.service';

describe('SaveUsersService', () => {
  let service: SaveUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
