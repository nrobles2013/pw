
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup,UntypedFormBuilder,UntypedFormControl ,Validators} from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RiesgosService } from 'app/services/reportes/riesgos.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from 'app/app/mimodule/material.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatOption } from '@angular/material/core';
import { ReportesService } from 'app/shared/services/reportes.service';
import { CommonModule } from '@angular/common';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Movimientos } from 'app/shared/models/movimientos.model';
import { MatTable } from '@angular/material/table';
import { Auditoria } from 'app/shared/models/auditoria.model';
import { AuditoriaService } from 'app/shared/services/auditoria.service';
import { MatSort } from '@angular/material/sort';
import { Informacion } from 'app/shared/models/informacion.model';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './Notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],

})
export class NotificacionesComponent implements OnInit, AfterViewInit {

  displayedColumns:string[] = ['fecha', 'asunto', 'accion'];
  dataSource: MatTableDataSource<Informacion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MaterialModule) materialModule: MaterialModule;
  @ViewChild(MatSort) sort: MatSort;
  notificacionForm: UntypedFormGroup;
  ruta:string;
  auditoria:Auditoria;
  miip:string;
  listinformacion:any[]=[];
  usuario_id:number;
  totalElements: number = 0;
  datos:any;
  fecha:Date;
  asunto:string;
  mensaje:string;

  constructor(

    private riesgoService: RiesgosService,
    private _snackBar: MatSnackBar,
    private reportesService:ReportesService,
    private fb: UntypedFormBuilder,
    private jwtAuth: JwtAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private auditoriaService:AuditoriaService,
  ) { }

  ngAfterViewInit(): void {
    if (this.jwtAuth.user.cparticipe=="99999"){
      this.router.navigate(['/sessions/signin']);
   }
  }

  ngOnInit(): void {
    this.notificacionForm = new UntypedFormGroup({
      fecha: new UntypedFormControl(this.fecha, Validators.required),
      asunto: new UntypedFormControl(this.asunto, Validators.required),
      mensaje: new UntypedFormControl(this.mensaje,Validators.required),
    });


    this.jwtAuth.traerIP().subscribe(data=>{
      let date: Date = new Date();
      let ip= JSON.stringify(data.ip);
      this.miip=ip

      this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"Consulta información de interes",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)
      this.auditoriaService.insertar(this.auditoria).subscribe(
      )}
    )
//this.jwtAuth.user.usuario_id
    this.reportesService.getListaNotificacion().subscribe(
      (response) => {
        console.log(response)
        this.listinformacion = response;
        this.createTable(this.listinformacion);
        this.totalElements = response.length;

 },
  (err) => {
    this.router.navigate(['/sessions/signin']);
  });
  }



  visualizaInfo(selector, el){
    this.datos=el;
    this.asunto=el.asunto
    this.fecha=el.fecha
    this.mensaje=el.mensaje
    console.log(selector)
    var elemento = document.querySelector(selector);
    if (selector=='#informacion2'){
      if (elemento != null) {
        elemento.style.display = 'none';
        selector='#informacion'
        var elementoprin = document.querySelector(selector);
        elementoprin.style.display = 'block';
      }
    }else{
      if (elemento != null) {
        elemento.style.display = 'none';
        selector='#informacion2'
        var elementoprin = document.querySelector(selector);
        elementoprin.style.display = 'block';
      }
    }

  }


  listPageable(p: number, s: number){
   // return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  createTable(data: Informacion[]){
    this.dataSource = new MatTableDataSource(data);
    console.log(this.dataSource)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  showMore(e: any){
    this.riesgoService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {

      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });
  }
}
