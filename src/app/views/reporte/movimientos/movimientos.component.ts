
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
import { ConsMovimiento } from '../../../shared/models/consmovimiento.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],

})
export class MovimientosComponent implements OnInit, AfterViewInit {

  displayedColumns:string[] = ['fecha', 'destipoopera', 'descripcion'];
  dataSource: MatTableDataSource<Movimientos>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MaterialModule) materialModule: MaterialModule;
  @ViewChild(MatSort) sort: MatSort;
  movimientoForm: UntypedFormGroup;
  getListAnio:any[]=[];
  getListMeses:any[]=[];
  getListTransa:any[]=[];
  listMovimientos: Movimientos[] = [];
  idAnioSelected:number;
  idMesSelected:number;
  idtransaSelected:string;
  auditoria:Auditoria;
  miip:string;
  infousu:string;
  cparticipe:string;
  usuario_id:number
  consMovimiento:ConsMovimiento;
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

    this.reportesService.getMoviListAnio().subscribe( (response) => {
      this.getListAnio=response;
    } , (err) => {
  this.router.navigate(['/sessions/signin']);
})

    this.reportesService.getListaTransac().subscribe( (response) => {
      this.getListTransa=response;
    });


    this.movimientoForm = new UntypedFormGroup({
      anio: new UntypedFormControl(this.idAnioSelected, Validators.required),
      mes: new UntypedFormControl(this.idMesSelected, Validators.required),
      tipopera: new UntypedFormControl(this.idtransaSelected,Validators.required),
    });


  }
  buscarmovimiento(){
    this.movimientoForm = new UntypedFormGroup({
      anio: new UntypedFormControl(this.idAnioSelected, Validators.required),
      mes: new UntypedFormControl(this.idMesSelected, Validators.required),
      tipopera: new UntypedFormControl(this.idtransaSelected,Validators.required),
    });

    if (this.movimientoForm.invalid) {
      this._snackBar.open("Ingresar datos requeridos", 'Verificar', {duration: 1000, horizontalPosition: 'right', verticalPosition: 'top'});

      return; }

    this.jwtAuth.traerIP().subscribe(data=>{
      let date: Date = new Date();
      let ip= JSON.stringify(data.ip);
      this.miip=ip

      this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"Consulta movimiento",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)
      this.auditoriaService.insertar(this.auditoria).subscribe(
      )
      }
    )
//this.jwtAuth.user.usuario_id
    this.consMovimiento = new ConsMovimiento( this.idAnioSelected,this.idMesSelected,36,this.idtransaSelected)
    this.reportesService.getListaMovimientos(this.consMovimiento).subscribe(
      (response) => {
        this.listMovimientos = response;
        this.createTable(this.listMovimientos);
        this.totalElements = response.length;
    });



  }
  ejecutoMes(event){
    this.idMesSelected=event.value
  }

  ejecutoAnio(event){
    this.idAnioSelected=event.value
    this.reportesService.getMoviListMes(this.idAnioSelected).subscribe( (response) => {
      this.getListMeses=response;
    });

  }

  ejecutoTransa(event){
    this.idtransaSelected=event.value


  }


  listPageable(p: number, s: number){
   // return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  createTable(data: Movimientos[]){
    this.dataSource = new MatTableDataSource(data);
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
