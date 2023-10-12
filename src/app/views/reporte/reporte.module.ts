
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption,MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { InversionComponent } from './inversion/inversion.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { InteresComponent } from './infointeres/interes.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { ResumenComponent } from './resumen/resumen.component';
import { EditarCuentaComponent } from './editarCuenta/editarCuenta.component';
import { MatSortModule } from '@angular/material/sort';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ConsultasComponent,
    InteresComponent,
    NotificacionesComponent,
    ContactanosComponent,MovimientosComponent,DocumentosComponent,EditarCuentaComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    FileUploadModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    PdfViewerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReporteModule { }


