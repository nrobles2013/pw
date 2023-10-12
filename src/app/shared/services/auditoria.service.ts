import { Injectable } from '@angular/core';
import { MenuUsuario } from '../models/menu.model';
import { Auditoria } from '../models/auditoria.model';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {



  constructor(private httpClient: HttpClient) { }



  public insertar(auditoria: Auditoria): Observable<any[]> {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    return this.httpClient.post<any[]>(`${environment.apiURL}/auditoria/insertar`, auditoria,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

}
