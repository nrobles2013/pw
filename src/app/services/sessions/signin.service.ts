import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { th } from 'date-fns/locale';
import { Session } from 'inspector';
import { SigninComponent } from 'app/views/sessions/signin/signin.component';
@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) {
    //return this.http.get<SigninComponent[]>('http://localhost:8090/proyecto-propuesta/api/users/all')
  }
}
