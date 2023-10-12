import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MenuUsuario } from 'app/shared/models/menu.model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { Tipoparticipe } from './Tipoparticipe.model';
import { Auditoria } from 'app/shared/models/auditoria.model';
import { MenuService } from 'app/shared/services/menu.service';
import { AuditoriaService } from 'app/shared/services/auditoria.service';
import { NavigationService } from "app/shared/services/navigation.service"  ;
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile,KeycloakRoles,KeycloakLoginOptions } from 'keycloak-js';
import { Usuario } from 'app/shared/models/usuario.model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  public isLogueado = false;
  public perfilUsuario:KeycloakProfile | null = null;

  private messageChange = new Subject<string>;
  signinForm: UntypedFormGroup;
  menuUsuario : MenuUsuario;
  auditoria:Auditoria;
  errorMsg = '';
  username:string;
  password:string;
  usuario_id:number;
  idtipoparticipeSelected:string;
  tipoparticipeIndex:Tipoparticipe[];
  tipoparticipe: Tipoparticipe[] = [{'idparticipe':'1','descripcion':'Individual'},{'idparticipe':'2','descripcion':'Copropiedad'},{'idparticipe':'3','descripcion':'Sucesión'}];;
  getMenuData:any[]=[];
  validaPass:Number=0;
  miip:string;
  isAuth = false;
  keycloak_kc: any;
  usuario:Usuario;
  userInformations: any;
   infousu:string;
   cparticipe:string;
  private _unsubscribeAll: Subject<any>;


  constructor(
    private fb: UntypedFormBuilder,
    private jwtAuth: JwtAuthService,
    private egretLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private menuService: MenuService,
    private auditoriaService:AuditoriaService,
    private navigationService:NavigationService,
    private readonly keycloak: KeycloakService,
  ) {
    this._unsubscribeAll = new Subject();
    this.validaPass=0;
  }
  ejecuto(event){
    this.idtipoparticipeSelected=event.value
  }


  public iniciarSession(){
    this.keycloak.login();
   }


   public cerrarSession(){
    this.keycloak.logout();
   }

  async ngOnInit() {
    this.isLogueado = await this.keycloak.isLoggedIn();
    type rolesUsuarios=Array<{id:number,text:string}>

    if (this.isLogueado){
      this.perfilUsuario = await this.keycloak.loadUserProfile();
    }


    this.signinForm = new UntypedFormGroup({
      username: new UntypedFormControl(this.username, Validators.required),
      password: new UntypedFormControl(this.password, Validators.required),
      rememberMe: new UntypedFormControl(true),
      idtipoparticipeSelected: new UntypedFormControl(this.idtipoparticipeSelected, Validators.required),
    });
  }


  ngAfterViewInit() {
    //this.autoSignIn();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  signin() {
    if (this.signinForm.invalid) { return; }

    const signinData = this.signinForm.value;
    this.usuario=new Usuario(this.username,"","","","","","",this.idtipoparticipeSelected)
        this.jwtAuth.listapermiso(this.usuario).subscribe(
          (data) => {
            console.log(data)
              this.validaPass=data;



    if (this.validaPass.valueOf()<3){


    this.jwtAuth.signin(this.username, this.password,this.idtipoparticipeSelected).subscribe(
      (response) => {

     const helper = new JwtHelperService();

        let token = JSON.stringify(response);
        sessionStorage.setItem(this.jwtAuth.JWT_TOKEN, token);
        let tk = JSON.parse(sessionStorage.getItem(this.jwtAuth.JWT_TOKEN));
        const decodedToken = helper.decodeToken(tk.access_token);
        this.menuUsuario = new MenuUsuario( this.username,this.idtipoparticipeSelected);

        this.menuService.lista(this.menuUsuario).subscribe(
          data =>{
            this.getMenuData = data;
            let datosusuario= JSON.stringify(data);

            let datosparse=JSON.parse(datosusuario)
            this.infousu= datosparse[0].usuario.nombre + " "+ datosparse[0].usuario.apellido
            this.jwtAuth.user={'id': '5b700c45639d2c0c54b354ba',
            displayName: this.infousu,
             role: datosparse[0].usuario.roles[0].name,
             username: datosparse[0].usuario.username,
             cparticipe:datosparse[0].usuario.cparticipe,
             usuario_id:datosparse[0].usuario.usuario_id,
             idtipoparticipe : this.idtipoparticipeSelected,
             correo:datosparse[0].usuario.email,
             pass:this.password,
            }


            this.jwtAuth.user.username=datosparse[0].usuario.username
            this.jwtAuth.user.cparticipe=datosparse[0].usuario.cparticipe
            this.jwtAuth.user.role= datosparse[0].usuario.roles[0].name,
            this.jwtAuth.user.usuario_id=datosparse[0].usuario.usuario_id
            this.jwtAuth.user.idtipoparticipe=this.idtipoparticipeSelected
            this.jwtAuth.user.correo=datosparse[0].usuario.email
            this.jwtAuth.user.pass=this.password
            this.cparticipe=datosparse[0].usuario.cparticipe
            this.usuario_id=datosparse[0].usuario.usuario_id
            localStorage.getItem(this.jwtAuth.JWT_TOKEN);
            datosparse[0].usuario.email,

            this.jwtAuth.traerIP().subscribe(data=>{
              let date: Date = new Date();
              let ip= JSON.stringify(data.ip);
              this.miip=ip

              this.auditoria = new Auditoria( this.miip,this.usuario_id,this.username,"logueandose",this.idtipoparticipeSelected,this.cparticipe,date)
              this.auditoriaService.insertar(this.auditoria).subscribe(
              )
            });
            this.navigationService.sendObjectSource(data)
            const resul=this.tipoparticipe.find(x => x.idparticipe == this.idtipoparticipeSelected);
            this.jwtAuth.idtipoparticipe = this.idtipoparticipeSelected;
            this.jwtAuth.descripcion = resul.descripcion;
            this.isLogueado = true;
            this.jwtAuth.isLoggedIn(true);
            this._snackBar.open("Accediendo", 'INFO', {duration: 1000, horizontalPosition: 'right', verticalPosition: 'top'});
            this.router.navigate(['/reporte/resumen']);
        })

      },
      (err) => {
        this.validaPass=this.validaPass.valueOf() + 1;
        this.isLogueado = false;

        this.usuario=new Usuario(this.username,"","","","","","",this.idtipoparticipeSelected)
        this.jwtAuth.permisousu(this.usuario).subscribe(
          (data) => {
              console.log(data);
          })

        //this.submitButton.disabled = false;
       // this.progressBar.mode = 'determinate';
       this._snackBar.open("Verificar datos", 'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
      }
    );
    }else{
      this.usuario=new Usuario(this.username,"","","","","","",this.idtipoparticipeSelected)
        this.jwtAuth.permisobloq(this.usuario).subscribe()

      this.isLogueado = false;
      this._snackBar.open("Clave esta bloqueada", 'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    }
  })
  }

 olvidoClave(){
  if (this.validaPass.valueOf()<3){
  this.router.navigate(['/sessions/forgot-password']);
  }else{
    this._snackBar.open("Clave esta bloqueada"+this.validaPass, 'INFO', {duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
  }
 }

  autoSignIn() {
    if (this.jwtAuth.return === '/') {
      return;
    }
    this.egretLoader.open(
      `Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(
        0,
        20
      )}...`,
      { width: '320px' }
    );
    setTimeout(() => {
      this.signin();

      this.egretLoader.close();
    }, 2000);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
