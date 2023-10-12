import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from 'app/app/mimodule/material.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule} from '@angular/material/card';
import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { ReportesService } from 'app/shared/services/reportes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class ResumenComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MaterialModule) materialModule: MaterialModule;
  valactual:string
  valactualfecha:string
  valfondo:string
  valYTD:string
  type:ChartType="line"
  barType:ChartType="bar"
  doughnutType:ChartType="doughnut"
  pieType:ChartType="pie"
  chart1:Chart
  chart2:Chart
  chart3:Chart
  chart4:Chart
  listfecha:any[]=[];
  listActual:any[]=[];
  listFondo:any[]=[];
  listYTD:any[]=[];
  constructor(
    private _snackBar: MatSnackBar,
    private reportesService:ReportesService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtAuth: JwtAuthService,

  ) {
   }

  ngAfterViewInit(): void {
    if (this.jwtAuth.user.cparticipe=="99999"){
      this.router.navigate(['/sessions/signin']);
    }
  }


  ngOnInit(): void {

    this.reportesService.getReporteResumenUltimo().subscribe(
      (response) => {
        let datos= JSON.stringify(response);
        let datosparse=JSON.parse(datos);
        const fechavalcuota =moment(datosparse[0].fecvalactual).format("DD/MM/YYYY");
        this.valactualfecha=fechavalcuota;
        this.valactual=datosparse[0].valactual;
        this.valfondo=datosparse[0].valcuota;
        this.valYTD=datosparse[0].ytd;
      })


    this.reportesService.getReporteResumenTodos().subscribe(
      (response) => {
        let datos= JSON.stringify(response);
        let datosparse=JSON.parse(datos)

            for (let i = 0; i < datosparse.length; i++){
              this.listfecha.push(moment(datosparse[i].fecvalactual).format("DD/MM/YYYY"))
              this.listActual.push(datosparse[i].valactual)
              this.listFondo.push(datosparse[i].valcuota)
              this.listYTD.push(datosparse[i].ytd)
            }
            Chart.defaults.font.family = "Oswald";
       this.chart1 = new Chart('canvas1', {
        type: this.type,
        data: {
          labels: this.listfecha,
          datasets: [
            {
              label: 'Valor Referencial del fondo',
              data: this.listActual,
              borderColor: "#3cba9f",
              fill: true,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: { plugins: {
          legend: {
              display: false,
              labels: {
                font: {
                  family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
              }
          }
      },
          scales: {
            x: {
              display: true,

            },
            y: {
              display: true,
              beginAtZero: true
            },
          }
        }
      });




      this.chart2= new Chart('canvas2', {
        type: this.barType,
        data: {
          labels: this.listfecha,
          datasets: [
            {
              label: 'Valor de Cuota',
              data: this.listFondo,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(255, 99, 132)',
                }
            }
        },
          scales: {
            x: {
              display: true
            },
            y: {
              display: true,
              beginAtZero: true
            },
          }
        }
      });



      this.chart3= new Chart('canvas3', {
        type: this.barType,
        data: {

          labels: this.listfecha,
          datasets: [
            {
              label: 'Rendimiento',
              data: this.listYTD,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: { plugins: {
          legend: {
              display: false,
              labels: {
                  color: 'rgb(255, 99, 132)',
              }
          },
      },
          indexAxis: 'y',
        },
      });
      });


  }

  listPageable(p: number, s: number){
   // return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }


  private formatoFecha(fecha: Date): string {
    // Formatear fecha en dd-MM-yyyy
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;

  }




}
