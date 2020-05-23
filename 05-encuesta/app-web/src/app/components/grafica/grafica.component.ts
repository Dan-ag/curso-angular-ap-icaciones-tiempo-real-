import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from 'src/services/websocket.service';

@Component( {
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: [ './grafica.component.scss' ]
} )
export class GraficaComponent implements OnInit {

  public barChartData: ChartDataSets[] = [
    { data: [ 0, 5, 10, 0 ], label: 'Preguntas' },
  ];
  public barChartLabels: Label[] = [ 'Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4' ];

  public barChartType: ChartType = 'bar';

  constructor(
    private http: HttpClient,
    private wsService: WebSocketService,
  ) { }

  ngOnInit(): void {
    // this.getData();
    this.listenSocket();
  }

  getData() {
    this.http.get( 'http://10.42.0.1:3000/quiz' )
      .subscribe( ( data: any ) => this.barChartData = data );
  }

  listenSocket() {
    this.wsService.listen( 'vote' )
      .subscribe( ( data: any ) => {
        console.log( 'dataSocket', data );
        this.barChartData = data;
      } );
  }
}
