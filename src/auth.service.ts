// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})



export class AuthService {
  private reporteServices = btoa('user:3b0d077f-d9f3-4242-846e-56925b524307');//riesgo
  authService: any;
  // Agregar credenciales para otros servicios si es necesario
  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiURL}`;

  private objectSource = new BehaviorSubject<any[]>([]);

  $getObjectSource = this.objectSource.asObservable();



  sendObjectSource(data:any[]){

    this.objectSource.next(data);
  }

  getReporteServices(): string {
    return this.reporteServices;
  }

  // Agregar métodos para obtener credenciales de otros servicios si es necesario

  enviarAuthServiceComoJson() {
    // Convertir el objeto AuthService a JSON
    const authServiceJson = JSON.stringify(this);

    // Agregar el JSON como parámetro de consulta en la URL

    const params = new HttpParams().set('authServiceJson', authServiceJson);

    // Realizar la solicitud GET con los parámetros de consulta
    this.http.get(this.apiUrl, { params }).subscribe(
      (data) => {
        console.log('Respuesta del servidor:', data);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
  obtenerDatos(fecha: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.authService.getReporteServices()}`,
    });
    const url = `${this.apiUrl}/${fecha}`;

    return this.http.get<any>(url, { headers });
  }
}
