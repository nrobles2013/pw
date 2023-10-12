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
import { Usuario } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-editarCuenta',
  templateUrl: './editarCuenta.component.html',
  styleUrls: ['./editarCuenta.component.scss'],
})
export class EditarCuentaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MaterialModule) materialModule: MaterialModule;
  editarForm: UntypedFormGroup;
  id:number;
  tipparticipe:string;
  nombre:string;
  password:string;
  repassword:string;
  nombreparticipe:string;
  corporativo:string;
  fijo:string;
  movil:string;
  email:string;
  auditoria:Auditoria;
  miip:string;
  hide = true;
  hide1 = true;
  valorpass:boolean = true;
  valorrepass:boolean = true;
  listinformacion:any[]=[];
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


this.reportesService.getListaUsuario(this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.username).subscribe(
(response) => {
  this.listinformacion=response;
  console.log(response)
  let datas= JSON.stringify(this.listinformacion);
  let info= JSON.parse(datas);

  this.id=info.username;
  if ( info.tpparticipe == "1"){
    this.tipparticipe = info.tpparticipe + "- Individual"
  }

  if ( info.tpparticipe == "2"){
    this.tipparticipe = info.tpparticipe + "- Copropiedad"
  }


  if ( info.tpparticipe == "3"){
    this.tipparticipe = info.tpparticipe + "- Sucesión"
  }

  this.nombre = info.nombre + " " + info.apellido;
  this.nombreparticipe = info.nombre + " " + info.apellido;
  this.email = info.email;
  this.movil = info.celular;
  this.corporativo = info.telcorpora
  this.fijo=info.telefono
  this.password= this.jwtAuth.user.pass;
  this.repassword=this.jwtAuth.user.pass;

} , (err) => {
// this.router.navigate(['/sessions/signin']);
})

  }

  ngOnInit(): void {
//this.jwtAuth.user.usuario_id
this.editarForm = new UntypedFormGroup({
  id: new UntypedFormControl(this.id),
  nombre: new UntypedFormControl(this.nombre),
  tipparticipe: new UntypedFormControl(this.tipparticipe),
  nombreparticipe: new UntypedFormControl(this.nombreparticipe),
  password: new UntypedFormControl(this.password,[Validators.required, Validators.minLength(8)]),
  repassword: new UntypedFormControl(this.repassword,[Validators.required, Validators.minLength(8)]),
  email:new UntypedFormControl(this.email,[Validators.required,Validators.email, Validators.minLength(8)]),
  fijo:new UntypedFormControl(this.fijo),
  movil:new UntypedFormControl(this.movil),
  corporativo:new UntypedFormControl(this.corporativo),
});

this.editarForm.get('id').disable()
this.editarForm.get('nombre').disable()
this.editarForm.get('nombreparticipe').disable()
this.editarForm.get('password').disable()
this.editarForm.get('repassword').disable()
this.editarForm.get('tipparticipe').disable()
this.editarForm.get('email').disable()
this.editarForm.get('fijo').disable()
this.editarForm.get('movil').disable()
this.editarForm.get('corporativo').disable()

this.jwtAuth.traerIP().subscribe(data=>{
  let date: Date = new Date();
  let ip= JSON.stringify(data.ip);
  this.miip=ip

  this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"Editar Cuenta",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)
  this.auditoriaService.insertar(this.auditoria).subscribe(
  )}
)
    /*
    this.editarForm = new UntypedFormGroup({
      password: new UntypedFormControl(this.password, [Validators.required, Validators.minLength(8)]),
      repassword: new UntypedFormControl(this.repassword, [Validators.required, Validators.minLength(8)]),
      email:new UntypedFormControl(this.repassword, [Validators.required, Validators.minLength(8),Validators.email]),
    });
*/

  }


  listPageable(p: number, s: number){
   // return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  grabaCuenta(){
    this.editarForm = new UntypedFormGroup({
      asunto: new UntypedFormControl(this.id, Validators.required),
      tipparticipe: new UntypedFormControl(this.tipparticipe, Validators.required),
      nombre: new UntypedFormControl(this.nombre, Validators.required),
    });
  }

   editarpass(){
    this.valorpass = false;
    this.valorrepass = false;

    this.editarForm.get('password').enable()

  }



  editarrp(){
   this.valorrepass = false;
   this.editarForm.get('repassword').enable()
  }

  grabarrp(){

    if (this.editarForm.invalid) {
      this._snackBar.open("verifique datos", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
    }else{
    this.valorpass = false;
    this.valorrepass = true;

    if (this.editarForm.get('repassword').value==this.editarForm.get('password').value){


      this.jwtAuth.traerIP().subscribe(data=>{
        let date: Date = new Date();
        let ip= JSON.stringify(data.ip);
        this.miip=ip

        this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"Modifico contraseña",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)

        this.auditoriaService.insertar(this.auditoria).subscribe(response =>{
        },
        (err) => {
         console.log(err)
         this._snackBar.open("Verificar datos", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        }
        )}
      )



      this.reportesService.getActualizaUsuario(this.jwtAuth.user.usuario_id,this.jwtAuth.user.username, this.editarForm.get('password').value).subscribe(
        response =>{
          this._snackBar.open("se guardo contraseña", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        },
        (err) => {
         console.log(err)
         this._snackBar.open("Verificar datos", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        }
      )

    }else{
      this._snackBar.open("Verificar contraseña no son iguales", 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});

    }

    this.editarForm.get('repassword').disable()
    this.editarForm.get('password').disable()
    }
  }
}
