import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
// import { RiesgosService } from 'app/services/reportes/riesgos.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { Riesgo } from './riesgo.model';
import { catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from 'app/app/mimodule/material.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { ReportesService } from 'app/shared/services/reportes.service';
import { MatCardModule} from '@angular/material/card';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Auditoria } from 'app/shared/models/auditoria.model';
import { AuditoriaService } from 'app/shared/services/auditoria.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class InversionComponent implements OnInit, AfterViewInit {

  auditoria:Auditoria;
  valnumpar:string
  valactualfecha:string
  valortotal:string
  valactual:string
  type:ChartType="line"
  barType:ChartType="bar"
  doughnutType:ChartType="doughnut"
  pieType:ChartType="pie"
  chart4:Chart
  chart5:Chart
  chart6:Chart
  listfecha:any[]=[];
  listNumpar:any[]=[];
  listTotalInver:any[]=[];
  listValactual:any[]=[];

  miip:string;
  infousu:string;
  cparticipe:string;
  usuario_id:number

  constructor(
    private _snackBar: MatSnackBar,
    private reportesService:ReportesService,
    private jwtAuth: JwtAuthService,
    private auditoriaService:AuditoriaService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    console.log("participe es"  )
    this.reportesService.getReporteInversionUltimo(this.jwtAuth.user.usuario_id,this.jwtAuth.user.cparticipe).subscribe(
      (response) => {

        let datos= JSON.stringify(response);
        let datosparse=JSON.parse(datos)

        const fechavalcuota =moment(datosparse[0].fecha).format("DD/MM/YYYY");
        console.log(fechavalcuota)
        this.valactualfecha=fechavalcuota
        this.valactual=datosparse[0].montoinvertido
        this.valnumpar=datosparse[0].numparticipacion
        this.valortotal=datosparse[0].valinvertido
      }, (err) => {
        this.router.navigate(['/sessions/signin']);
      });


    this.reportesService.getReporteInversionTodos(this.jwtAuth.user.usuario_id,this.jwtAuth.user.cparticipe).subscribe(
      (response) => {

        let datos= JSON.stringify(response);
        let datosparse=JSON.parse(datos)

            for (let i = 0; i < datosparse.length; i++){
              this.listfecha.push(moment(datosparse[i].fecha).format("DD/MM/YYYY"))
              console.log(datosparse[i].fecha)
              this.listTotalInver.push(datosparse[i].montoinvertido)
              this.listNumpar.push(datosparse[i].numparticipacion)
              this.listValactual.push(datosparse[i].valinvertido)
            }


       this.chart4 = new Chart('canvas4', {
        type: this.type,
        data: {
          labels: this.listfecha,
          datasets: [
            {
              label: 'Número de Participación',
              data: this.listNumpar,
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
                  color: 'rgb(255, 99, 132)'
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


      this.chart5= new Chart('canvas5', {
        type: this.barType,
        data: {
          labels: this.listfecha,
          datasets: [
            {
              label: 'Total de Inversión',
              data: this.listTotalInver,
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
                    color: 'rgb(255, 99, 132)'
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

      this.chart6= new Chart('canvas6', {
        type: this.barType,
        data: {

          labels: this.listfecha,
          datasets: [
            {
              label: 'Valor actual de su inversión',
              data: this.listValactual,
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
                  color: 'rgb(255, 99, 132)'
              }
          }
      },
          indexAxis: 'y',
        },
      });
      });


      this.jwtAuth.traerIP().subscribe(data=>{
        let date: Date = new Date();
        let ip= JSON.stringify(data.ip);
        this.miip=ip

        this.auditoria = new Auditoria( this.miip,this.jwtAuth.user.usuario_id,this.jwtAuth.user.username,"ingreso a tú Inversion",this.jwtAuth.user.idtipoparticipe,this.jwtAuth.user.cparticipe,date)
        this.auditoriaService.insertar(this.auditoria).subscribe(
          data =>{
            console.log(data)
          }
        )}
      )
  }


  listPageable(p: number, s: number){
   // return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }


  ngAfterViewInit() {
    if (this.jwtAuth.user.cparticipe=="99999"){
      this.router.navigate(['/sessions/signin']);
   }
    // Event listener para 'touchmove' con passive: true
    window.addEventListener('touchmove', this.handleTouchMove, {
      passive: true,
    });
    // Event listener para 'touchstart' con passive: true
    window.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    });
  }

  handleTouchMove(event: TouchEvent) {
    // Lógica para manejar el evento 'touchmove'
    // Puedes agregar aquí cualquier código que necesites ejecutar cuando se detecte el evento 'touchmove'
  }

  handleTouchStart(event: TouchEvent) {
  // Lógica para manejar el evento 'touchstart'
  // Puedes agregar aquí cualquier código que necesites ejecutar cuando se detecte el evento 'touchstart'
  }

}
