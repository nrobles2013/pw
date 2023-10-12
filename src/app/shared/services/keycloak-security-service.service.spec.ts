import { TestBed } from '@angular/core/testing';

import { KeycloakSecurityServiceService } from './keycloak-security-service.service';

describe('KeycloakSecurityServiceService', () => {
  let service: KeycloakSecurityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakSecurityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
