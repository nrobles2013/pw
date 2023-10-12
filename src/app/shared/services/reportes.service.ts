import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'auth.service';
import { Observable } from 'rxjs';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { environment } from 'environments/environment';
import { Anio } from '../models/anio.model';
import { Transaccion } from '../models/transaccion.model';
import { Movimientos } from 'app/shared/models/movimientos.model';
import { ConsMovimiento } from '../models/consmovimiento.model';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = `${environment.apiURL}`;


  private reporteServices = btoa('user:b4530586-15c6-43cf-8c1d-960f426f1986');
  // Agregar credenciales para otros servicios si es necesario

  constructor(private http: HttpClient, private authService: AuthService,private serv :JwtAuthService ) { }


  getReporteResumenTodos() {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/estadistica/listatodos`;
    return this.http.get<string>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getReporteResumenUltimo() {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));

    const url = `${this.apiUrl}/estadistica/listaultimo`;
    return this.http.get<string>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }




  getReporteInversionTodos(usuario_id, cparticipe) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/inversion/listatodos`;
    console.log("usuario es"+usuario_id)
    return this.http.post<string>(url,{ usuario_id,cparticipe},{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getReporteInversionUltimo(usuario_id, cparticipe) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/inversion/listaultimo`;
    console.log("usuario es"+usuario_id)
    return this.http.post<string>(url,{ usuario_id,cparticipe},{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }



  getMoviListAnio() {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/movimientos/listaanio`;
    return this.http.get<Anio[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }


  getMoviListMes(meses) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/movimientos/listames/`+meses;
    console.log(url)
    return this.http.get<any[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getListaTransac(){
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/transaccion/listatodos`;
    console.log(url)
    return this.http.get<Transaccion[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getListaMovimientos(movimientos:ConsMovimiento){
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/movimientos/listamovimientos`;
    return this.http.post<Movimientos[]>(url,movimientos,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getListAnioConsulta() {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/tipodocumentos/listaanio`;
    return this.http.get<Anio[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getListDocumentosConsulta(ptipo) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/tipodocumentos/listadocumentos/${ptipo}`;
    return this.http.get<any[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getListPeriodoConsulta() {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/tipodocumentos/listaperiodo`;
    return this.http.get<any[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getListFileRutaConsulta(ptipo) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/filedocumento/listafile/${ptipo}`;
    return this.http.get<any[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }


  getFileRutaEnvioConsulta(ruta,cparticipe,tipodocumento,correo,anio,periodo) {

    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/consulta/enviocorreo`;
    return this.http.post<any[]>(url,{ruta,cparticipe,tipodocumento,correo,anio,periodo},{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getInformacionConsulta(tipodoc: String,cpart:String) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/consulta/traedocumentos/${tipodoc}/${cpart}`;
    return this.http.get<any[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getFileRutaEnvioDocumentos(ruta,cparticipe,tipodocumento,nombredocumento,correo) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/documentos/enviocorreo`;
    console.log(correo)
    console.log(nombredocumento)
    return this.http.post<any[]>(url,{ruta,cparticipe,tipodocumento,nombredocumento,correo},{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }


  getGereneratePDF(ruta:string){
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/filedocumento/generapdf`;
       return this.http.post(url,{ruta},{
        headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
        ,
        responseType: 'blob'})
      }



  getVERPDF(ruta:string){
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/filedocumento/verpdf`;
        return this.http.post(url,{ruta},{
        headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
        ,
        responseType: 'blob'})
      }


  getListaNotificacion() {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/notificacion/listatodos`;
    return this.http.get<any[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getEnvioContactanos(usuario,correo,asunto,mensaje) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/contactanos/enviocorreo`;
    return this.http.post<any[]>(url,{usuario,correo,asunto,mensaje},{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }


  getListaUsuario(tpparticipe,username) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/usuario/lista`;
    return this.http.post<any[]>(url,{tpparticipe,username},{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

  getActualizaUsuario(usuario_id,username,password) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    const url = `${this.apiUrl}/usuario/update`;
    return this.http.put<any[]>(url,{usuario_id,username,password},{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`).set('Content-Type', 'application/json')
    });
  }

}
