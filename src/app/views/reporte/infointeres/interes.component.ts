
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
  selector: 'app-interes',
  templateUrl: './Interes.component.html',
  styleUrls: ['./interes.component.scss'],

})
export class InteresComponent implements OnInit, AfterViewInit {

  displayedColumns:string[] = ['documento', 'fecha', 'accion'];
  dataSource: MatTableDataSource<Informacion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MaterialModule) materialModule: MaterialModule;
  @ViewChild(MatSort) sort: MatSort;
  ruta:string;
  auditoria:Auditoria;
  miip:string;
  listinformacion:any[]=[];
  usuario_id:number;
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
  }

  ngOnInit(): void {
    this.jwtAuth.traerIP().subscribe(data=>{
      let date: Date = new Date();
      let ip= JSON.stringify(data.ip);
      this.miip=ip

      this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"Consulta información de interes",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)
      this.auditoriaService.insertar(this.auditoria).subscribe(
      )}
    )
//this.jwtAuth.user.usuario_id
    this.reportesService.getInformacionConsulta("0003","9999").subscribe(
      (response) => {
        console.log(response)
        this.listinformacion = response;
        this.createTable(this.listinformacion);
        this.totalElements = response.length;

 } , (err) => {
  this.router.navigate(['/sessions/signin']);
})

  }


  visualizaInfo(event){
    this.ruta=event
      this.jwtAuth.traerIP().subscribe(data=>{
        let date: Date = new Date();
        let ip= JSON.stringify(data.ip);
        this.miip=ip

        this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"documentos interes",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)

        this.auditoriaService.insertar(this.auditoria).subscribe(response =>{
        },
        (err) => {
         console.log(err)
         this._snackBar.open("Verificar datos", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        }
        )}
      )


      this.reportesService.getVERPDF(this.ruta).subscribe(
        response =>{

          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);

          console.log(response)
        },
        (err) => {
         console.log(err)
         this._snackBar.open("Verificar datos", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        }
      )


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
