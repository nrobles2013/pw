import { TestBed } from '@angular/core/testing';

import { RiesgosService } from './riesgos.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class reportesRiesgoService {
  constructor(
    private http: HttpClient
  ) { }
  getAllRiesgo() {
    return this.http.get<reportesRiesgoService[]>('http://localhost:8085/reporte-riesgo/')
  }

}

describe('RiesgosService', () => {
  let service: RiesgosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiesgosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
