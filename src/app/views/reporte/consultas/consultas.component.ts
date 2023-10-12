
import { AfterViewInit, ViewChild, inject } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup,UntypedFormBuilder,UntypedFormControl ,Validators} from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { catchError, Subject } from 'rxjs';
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
import { MatTable } from '@angular/material/table';
import { Auditoria } from 'app/shared/models/auditoria.model';
import { AuditoriaService } from 'app/shared/services/auditoria.service';
import { MatSort } from '@angular/material/sort';
import { UtilService } from 'app/shared/services/util.service';


@Component({
  selector: 'app-documentos',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MaterialModule) materialModule: MaterialModule;
  private utilService = inject(UtilService);
  isLoading: Subject<boolean> = this.utilService.isLoading; // Variable para controlar la visibilidad del spinner
  //isLoading:boolean;
  consultaForm: UntypedFormGroup;
  getListAnio:any[]=[];
  getListDocumentos:any[]=[];
  getListPeriodo:any[]=[];
  getListFileRuta:any;
  idAnioSelected:number;
  getflag:boolean;
  iddocumentoSelected:string;
  idPeriodoSelected:string;
  getcontenido:string;
  getrespuesta:string;
  getruta:string;
  auditoria:Auditoria;
  miip:string;
  infousu:string;
  cparticipe:string;
  usuario_id:number
  totalElements: number = 0;


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

  // Event listener para 'touchmove' con passive: true
  window.addEventListener('touchmove', this.handleTouchMove, {
    passive: true,
  });
  // Event listener para 'touchstart' con passive: true
  window.addEventListener('touchstart', this.handleTouchStart, {
    passive: true,
  });
  }

  ngOnInit(): void {


    this.consultaForm = new UntypedFormGroup({
      documentos: new UntypedFormControl(this.iddocumentoSelected, Validators.required),
      anio: new UntypedFormControl(this.idAnioSelected, Validators.required),
      periodo: new UntypedFormControl(this.idPeriodoSelected),
    });


    this.reportesService.getListAnioConsulta().subscribe( (response) => {
      this.getListAnio=response;
    });

    this.reportesService.getListDocumentosConsulta("0001").subscribe( (response) => {
      this.getListDocumentos=response;
         });

    this.reportesService.getListPeriodoConsulta().subscribe( (response) => {
      this.getListPeriodo=response;
    });

    this.reportesService.getListFileRutaConsulta("0001").subscribe
    ( (response) => {
      this.getListFileRuta=response;
      console.log(response)
      let datosparse=JSON.stringify(response)
      let info=JSON.parse(datosparse)
      console.log(info)
      this.getcontenido=info.contenido;
      this.getrespuesta=info.respuesta;
      this.getruta=info.ruta;

    });

  }

  buscardocumentos(){
    this.consultaForm = new UntypedFormGroup({
      documentos: new UntypedFormControl(this.iddocumentoSelected, Validators.required),
      anio: new UntypedFormControl(this.idAnioSelected, Validators.required),
      periodo: new UntypedFormControl(this.idPeriodoSelected),
    });
    if (this.consultaForm.invalid) {
      this._snackBar.open("Ingresar datos requeridos", 'Verificar', {duration: 1000, horizontalPosition: 'right', verticalPosition: 'top'});
      return; }

    this.jwtAuth.traerIP().subscribe(data=>{
      let date: Date = new Date();
      let ip= JSON.stringify(data.ip);
      this.miip=ip

      this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"Consulta documentos",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)
      this.auditoriaService.insertar(this.auditoria).subscribe(
      )}
    )

    let carpeta=""
    let rutafinal=""
    if (this.iddocumentoSelected=="0001"){
      carpeta="estadocuenta"
       rutafinal=this.getruta+"\\"+carpeta+"\\"+this.idAnioSelected+"\\"+this.idPeriodoSelected;
    }
    if (this.iddocumentoSelected=="0002"){
      carpeta="liquidacion"
      rutafinal=this.getruta+"\\"+carpeta+"\\"+this.idAnioSelected+"\\"+this.idPeriodoSelected;
    }

    if (this.iddocumentoSelected=="0008"){
      carpeta="atribucion"
      rutafinal=this.getruta+"\\"+carpeta+"\\"+this.idAnioSelected;
    }
    if (this.iddocumentoSelected=="0009"){
      carpeta="retencion"
      rutafinal=this.getruta+"\\"+carpeta+"\\"+this.idAnioSelected;
    }

    this.reportesService.getFileRutaEnvioConsulta(rutafinal,this.jwtAuth.user.cparticipe,this.iddocumentoSelected,this.jwtAuth.user.correo,this.idAnioSelected,this.idPeriodoSelected).subscribe(
      (response) => {
        let datosparse=JSON.stringify(response)
        let mensaje=JSON.parse(datosparse)
        if (mensaje.mensaje=="se envio el correo, Correctamente"){
          this.getflag=true;
          this.getcontenido=this.getrespuesta
        }


        this._snackBar.open(mensaje.mensaje, 'Informe', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});

      } ,(err) => {
        this.router.navigate(['/sessions/signin']);
      });


  }

  listPageable(p: number, s: number){
   // return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }


  ejecutoAnio(event){
    this.idAnioSelected=event.value
  }

  ejecutoPeriodo(event){
    if (this.iddocumentoSelected != "0008"){
      this.idPeriodoSelected=event.value
    }
    if  (this.iddocumentoSelected != "0009"){
      this.idPeriodoSelected=event.value
    }
  }

  ejecutoDocumentos(event){

    this.iddocumentoSelected=event.value
  }



  handleTouchMove(event: TouchEvent) {
    // Lógica para manejar el evento 'touchmove'
    // Puedes agregar aquí cualquier código que necesites ejecutar cuando se detecte el evento 'touchmove'
  }

  handleTouchStart(event: TouchEvent) {
  // Lógica para manejar el evento 'touchstart'
  // Puedes agregar aquí cualquier código que necesites ejecutar cuando se detecte el evento 'touchstart'
  }


}
