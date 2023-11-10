import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { SaveUsersService } from './save-users.service';

describe('SaveUsersService', () => {
  let service: SaveUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SaveUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
