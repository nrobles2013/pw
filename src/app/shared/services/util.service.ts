import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Subject  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLoading = new Subject<boolean>();

  constructor(private keycloakService: KeycloakService) { }

  foto(){
    return this.keycloakService.getKeycloakInstance().clientId;
  }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}