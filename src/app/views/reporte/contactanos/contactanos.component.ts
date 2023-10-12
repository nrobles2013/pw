import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { RiesgosService } from 'app/services/reportes/riesgos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from 'app/app/mimodule/material.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { AuditoriaService } from 'app/shared/services/auditoria.service';
import { Auditoria } from 'app/shared/models/auditoria.model';
import { ReportesService } from 'app/shared/services/reportes.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.scss'],
})
export class ContactanosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MaterialModule) materialModule: MaterialModule;
  contactanosForm: UntypedFormGroup;
  asunto:string;
  mensaje:string;
  auditoria:Auditoria;
  miip:string;

  constructor(
    private _snackBar: MatSnackBar,
    private auditoriaService:AuditoriaService,
    private reportesService:ReportesService,
    private fb: UntypedFormBuilder,
    private jwtAuth: JwtAuthService,
    private router: Router,
    private route: ActivatedRoute,
   ) { }
  ngAfterViewInit(): void {
    if (this.jwtAuth.user.cparticipe=="99999"){
      this.router.navigate(['/sessions/signin']);
   }
  }

  ngOnInit(): void {

    this.contactanosForm = new UntypedFormGroup({
      asunto: new UntypedFormControl(this.asunto, Validators.required),
      mensaje: new UntypedFormControl(this.mensaje, Validators.required),
    });


  }


  listPageable(p: number, s: number){
   // return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  enviarContatos(){
    this.contactanosForm = new UntypedFormGroup({
      asunto: new UntypedFormControl(this.asunto, Validators.required),
      mensaje: new UntypedFormControl(this.mensaje, Validators.required),
    });


    if (this.contactanosForm.invalid) {
      this._snackBar.open("Ingresar datos requeridos", 'Verificar', {duration: 1000, horizontalPosition: 'right', verticalPosition: 'top'});
      return; }

    this.jwtAuth.traerIP().subscribe(data=>{
      let date: Date = new Date();
      let ip= JSON.stringify(data.ip);
      this.miip=ip

      this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"Enviar mensaje de contactanos",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)
      this.auditoriaService.insertar(this.auditoria).subscribe(
      )}
    )


    this.reportesService.getEnvioContactanos(this.jwtAuth.user.displayName, this.jwtAuth.user.correo,this.asunto,this.mensaje).subscribe(
      (response) => {
        let datosparse=JSON.stringify(response)
        let mensaje=JSON.parse(datosparse)
        this._snackBar.open(mensaje.mensaje, 'Informe', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});

      }, (err) => {
        this.router.navigate(['/sessions/signin']);
      });

  }
}
