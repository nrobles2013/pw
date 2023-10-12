import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://192.168.116.116:8045/proyecto-reportes/api/reporte-riesgo';

  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerDatos(fecha: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.authService.getReporteServices()}`,
    });
    const url = `${this.apiUrl}/${fecha}`;

    return this.http.get<any>(url, { headers });
  }
}
