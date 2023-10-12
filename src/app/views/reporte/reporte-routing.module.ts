import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversionComponent } from './inversion/inversion.component';
import { MatTableModule } from '@angular/material/table';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { InteresComponent } from './infointeres/interes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { EditarCuentaComponent } from './editarCuenta/editarCuenta.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { ResumenComponent } from './resumen/resumen.component';
import { CertGuardsTsService } from 'app/shared/guards/cert.guards';


const routes: Routes = [
  {
    path: 'inversion',
    component: InversionComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'Inversión de Capital',
      breadcrumb: 'Inversión de Capital'
    }
  },
  {
    path: 'movimientos',
    component: MovimientosComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'Movimientos',
      breadcrumb: 'Movimientos'
    }
  },
  {
    path: 'consultas',
    component: ConsultasComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'Consultas',
      breadcrumb: 'Consultas'
    }
  },
  {
    path: 'infointeres',
    component: InteresComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'Interés',
      breadcrumb: 'Interés'
    }
  }, {
    path: 'notificaciones',
    component: NotificacionesComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'Notificaciones',
      breadcrumb: 'Notificaciones'
    }
  }, {
    path: 'documentos',
    component: DocumentosComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'documentos',
      breadcrumb: 'documentos'
    }
  }, {
    path: 'editarCuenta',
    component: EditarCuentaComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'Editar Cuenta',
      breadcrumb: 'Editar Cuenta'
    }
  }, {
    path: 'contactanos',
    component: ContactanosComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'contactanos',
      breadcrumb: 'Contáctanos'
    }
  }, {
    path: 'resumen',
    component: ResumenComponent,
    canActivate: [ CertGuardsTsService],
    data: {
      title: 'resumen',
      breadcrumb: 'resumen'
    }
  }


];


@NgModule({
  imports: [RouterModule.forChild(routes), MatTableModule
  ],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
