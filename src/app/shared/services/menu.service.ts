import { Injectable } from '@angular/core';
import { MenuUsuario } from '../models/menu.model';
import { Auditoria } from '../models/auditoria.model'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {



  constructor(private httpClient: HttpClient) { }


  public lista(menuUsuario: MenuUsuario): Observable<any[]> {
    console.log(menuUsuario.username+"post")
    return this.httpClient.post<any[]>(`${environment.apiURL}/menuusuario/lista`, menuUsuario);
  }


}
