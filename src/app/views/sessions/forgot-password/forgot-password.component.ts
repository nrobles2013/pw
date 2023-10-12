
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Auditoria } from 'app/shared/models/auditoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Correo } from 'app/shared/models/correo.model';
import { catchError } from 'rxjs';
import { NavigationService } from '../../../shared/services/navigation.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail;
  signinForm: UntypedFormGroup;
  usuario_id:number;
  correo:Correo;
  datosusuario:any[]=[];
  miip:string;
  constructor(  private _snackBar: MatSnackBar,
    private router: Router,
    private navigationService:NavigationService,
    private route: ActivatedRoute,
    private jwtAuth: JwtAuthService) {
   }

  ngOnInit() {
    const userEmail = new UntypedFormControl('', Validators.required);


    this.signinForm = new UntypedFormGroup({
      userEmail: new UntypedFormControl(this.userEmail, Validators.required),
    });
  }
  submitEmail() {
    this.jwtAuth.traerIP().subscribe(data=>{
      let ip= JSON.stringify(data.ip);
      this.miip=ip
      console.log(this.miip)
      this.correo = new Correo(this.userEmail,this.miip);

      this.jwtAuth.reseteo(this.correo).pipe(
        catchError((error) => {
          console.log('Error en la solicitud:', error);
          throw error; // Lanza el error para que pueda ser manejado por otros componentes/observadores.
        })
      )
      .subscribe((data) => {
         if (data.mensaje == "ok"){



         this.navigationService.sendObjectSourcePass(data);
          this.router.navigate(['/sessions/password']);
         }else{

          this._snackBar.open(data.mensaje, 'Informe', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});

         }

      });

      }
     )


  }
}
