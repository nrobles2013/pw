import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Riesgo } from 'app/views/reporte/inversion/riesgo.model';
import { AuthService } from 'auth.service';
import { Observable } from 'rxjs';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RiesgosService {
  private apiUrl = `${environment.apiURL}/reporte-riesgo`;


  private reporteServices = btoa('user:b4530586-15c6-43cf-8c1d-960f426f1986');
  // Agregar credenciales para otros servicios si es necesario

  constructor(private http: HttpClient, private authService: AuthService,private serv :JwtAuthService ) { }



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


  listPageable(p: number, s: number){
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));

    return this.http.get<any>(`${this.apiUrl}/pageable?page=${p}&size=${s}`);
  }

  obtenerDatos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getReporteServices()}`
    });

    return this.http.get<any>(`${this.apiUrl}/datos`, { headers });
  }

  getReporteRiesgo(fechaFormateada: String) {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    console.log("getreporteNUEVO"+this.serv.idtipoparticipe)

    const url = `${this.apiUrl}/${this.serv.idtipoparticipe}/${fechaFormateada}`;
    console.log("esla info"+url)
    return this.http.get<string>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.jwtToken}`).set('Content-Type', 'application/json')
    });
  }


  getReporteRiesgo2(fechaFormateada: String): Observable<any[]> {
    const token = JSON.parse(sessionStorage.getItem("JWT_TOKEN"));
    console.log("getreporte"+token.jwtToken)

    const url = `${this.apiUrl}/${fechaFormateada}`;
    console.log("esla info"+`Bearer ${token.jwtToken}`)
    return this.http.get<any[]>(url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token.jwtToken}`).set('Content-Type', 'application/json')
    });
  }





  getDataConf() {
    return [
      // {
      //   prop: 'id',
      // },
      {
        prop: 'CODIGOTCHN',
        name: 'CODIGOTCHN',
      },
      {
        prop: 'CMONEDA',
        name: 'CMONEDA',
      },
      {
        prop: 'NDOCUMENTO',
        name: 'NDOCUMENTO',
      },
      {
        prop: 'tapaterno',
        name: 'tapaterno',
      },
      {
        prop: 'tamaterno',
        name: 'tamaterno',
      },
      {
        prop: 'tnombres',
        name: 'tnombres',
      },
      {
        prop: 'EDAD',
        name: 'EDAD',
      },
      {
        prop: 'DNACIMIENTO',
        name: 'DNACIMIENTO',
      },
      {
        prop: 'tdireccion',
        name: 'tdireccion',
      },
      {
        prop: 'CUBIGEO',
        name: 'CUBIGEO',
      },
      {
        prop: 'DEPARTAMENTO',
        name: 'DEPARTAMENTO',
      },
      {
        prop: 'PROVINCIA',
        name: 'PROVINCIA',
      },
      {
        prop: 'DISTRITO',
        name: 'DISTRITO',
      },
      {
        prop: 'cinmueble',
        name: 'cinmueble',
      },
      {
        prop: 'actividad',
        name: 'actividad',
      },
      {
        prop: 'saldoactual',
        name: 'saldoactual',
      },

      {
        prop: 'ESTADO',
        name: 'ESTADO',
      },
      {
        prop: 'cuota',
        name: 'cuota',
      },
      {
        prop: 'sueldo',
        name: 'sueldo',
      },
      {
        prop: 'fdesembolso',
        name: 'fdesembolso',
      },
      {
        prop: 'tipooperacion',
        name: 'tipooperacion',
      },
      {
        prop: 'SINFOCORP',
        name: 'SINFOCORP',
      },
      {
        prop: 'NVALORIZACION',
        name: 'NVALORIZACION',
      },
      {
        prop: 'VEDIFICACION',
        name: 'VEDIFICACION',
      },
      {
        prop: 'VPROPIEDAD',
        name: 'VPROPIEDAD',
      },
      {
        prop: 'VCOMERCIAL',
        name: 'VCOMERCIAL',
      },
      {
        prop: 'VREALIZACIONSOL',
        name: 'VREALIZACIONSOL',
      },
      {
        prop: 'VREALIZACIONDOL',
        name: 'VREALIZACIONDOL',
      },
      {
        prop: 'FVALORIZACION',
        name: 'FVALORIZACION',
      },
      {
        prop: 'ncuotasgeneradas',
        name: 'ncuotasgeneradas',
      }
    ];
  }
}
