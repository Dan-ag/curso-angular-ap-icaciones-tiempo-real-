import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from 'src/services/websocket.service';

@Component( {
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: [ './grafica.component.scss' ]
} )
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [ 0, 0, 0, 0 ], label: 'Ventas' },
  ];
  public lineChartLabels: Label[] = [ 'January', 'February', 'March', 'April' ];

  public lineChartType = 'line';

  constructor(
    private http: HttpClient,
    private wsService: WebSocketService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.listenSocket();
  }

  getData() {
    this.http.get( 'http://10.42.0.1:3000/graph' )
      .subscribe( ( data: any ) => this.lineChartData = data );
  }

  listenSocket() {
    this.wsService.listen( 'change-graph' )
      .subscribe( ( data: any ) => {
        console.log( 'dataSocket', data );
        this.lineChartData = data;
      } );
  }


}
