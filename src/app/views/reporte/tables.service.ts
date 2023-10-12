import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Riesgo } from './inversion/riesgo.model';
import { Observable } from 'rxjs';
import { AuthService } from 'auth.service';

@Injectable({
  providedIn: 'root',
})
export class TablesService {

  private apiUrl = 'http://localhost:8085';

  private reporteServices = btoa('user:b4530586-15c6-43cf-8c1d-960f426f1986');
  // Agregar credenciales para otros servicios si es necesario
  constructor(private http: HttpClient, private authService: AuthService) { }


  getReporteServices(): string {
    return this.reporteServices;
  }

  enviarAuthServiceComoJson() {
    // Convertir el objeto AuthService a JSON
    const authServiceJson = JSON.stringify(this);

    // Agregar el JSON como parámetro de consulta en la URL
    const url = 'http://localhost:8085';
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

    return this.http.get<any>(url);
  }
}
