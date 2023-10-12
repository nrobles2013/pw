
import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatLegacyButton as MatButton } from '@angular/material/legacy-button';
import { MatLegacyProgressBar as MatProgressBar } from '@angular/material/legacy-progress-bar';
import { NavigationService } from 'app/shared/services/navigation.service';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportesService } from 'app/shared/services/reportes.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Auditoria } from 'app/shared/models/auditoria.model';
import { AuditoriaService } from 'app/shared/services/auditoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Correo } from 'app/shared/models/correo.model';
import { catchError } from 'rxjs';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Usuariopass } from 'app/shared/models/usuariopass.model';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  signinForm: UntypedFormGroup;
  changepass:Usuariopass;
  usuario_id:number;
  totalElements: number = 0;
  codigover:string;
  correo:Correo;
  email:string;
  username:string;
  id_usuario:number;
  password:string;
  hide = true;
  datosusuario:any;
  constructor(  private _snackBar: MatSnackBar,
    private reportesService:ReportesService,
    private auditoriaService:AuditoriaService,
    private navigationService:NavigationService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtAuth: JwtAuthService) {
   }

  ngOnInit() {
    const codigover = new UntypedFormControl('', Validators.required);



   this.navigationService.$getObjectSourcePass.subscribe((data)=>{

    let info = JSON.stringify(data)
    let parseo = JSON.parse(info)
    this.datosusuario=data

    this.id_usuario=this.datosusuario.usuario_id
    this.username=this.datosusuario.username
    this.email=this.datosusuario.correo
  })

   this.signinForm = new UntypedFormGroup({
      id_usuario: new UntypedFormControl(this.id_usuario, Validators.required),
      username: new UntypedFormControl(this.username, Validators.required),
      email: new UntypedFormControl(this.email, Validators.required),
      codigover: new UntypedFormControl(this.codigover, Validators.required),
      password: new UntypedFormControl(this.password, Validators.required),
    });


      this.signinForm.get('username').disable()
      this.signinForm.get('email').disable()
  }
  submitVerificar() {
    console.log(this.id_usuario)
    console.log(this.username)
    console.log(this.password)
    console.log(this.email)
    console.log(this.codigover)
    this.changepass=new Usuariopass(this.id_usuario,this.username,this.password,this.email,this.codigover)
    this.jwtAuth.actualizapass(this.changepass).pipe(
      catchError((error) => {
        console.log('Error en la solicitud:', error);
        throw error; // Lanza el error para que pueda ser manejado por otros componentes/observadores.
      })
    )
    .subscribe((data) => {
       if (data.mensaje == "ok"){

       this.navigationService.sendObjectSourcePass(data);
        this.router.navigate(['/sessions/signin']);
       }else{

        this._snackBar.open(data.mensaje, 'Informe', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});

       }

    });
  }
}
