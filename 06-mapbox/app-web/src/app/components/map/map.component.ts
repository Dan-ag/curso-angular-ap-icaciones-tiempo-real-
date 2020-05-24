import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { Place } from 'src/app/insterfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from 'src/services/websocket.service';

interface RespMarker {
  [ key: string ]: Place;
}


@Component( {
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
} )
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  // placePoints: Place[] = [];
  placePoints: RespMarker = {};
  markers: { [ id: string ]: mapboxgl.Marker; } = {};

  constructor( private http: HttpClient, public wsService: WebSocketService ) { }

  ngOnInit(): void {
    this.http.get<RespMarker>( 'http://10.42.0.41:3000/map' )
      .subscribe( ( pointsData: RespMarker ) => {
        this.placePoints = pointsData;
        this.createMap();
      } );
    this.listenSockets();
  }

  listenSockets() {
    // create-marker
    this.wsService.listen( 'createMarker' )
      .subscribe( ( pointsData: Place ) => {
        console.log( 'agregaron algo', pointsData );
        this.aggregateMark( pointsData );
      } );

    // move-marker
    this.wsService.listen( 'moveMarker' )
      .subscribe( ( pointsData: Place ) => {
        console.log( 'movieron algo', pointsData );

        this.markers[ pointsData.id ].setLngLat( { lng: pointsData.lng, lat: pointsData.lat } );
      } );

    // delete-marker
    this.wsService.listen( 'deleteMarker' )
      .subscribe( ( pointsData: Place ) => {
        console.log( 'borraron algo', pointsData );
        this.markers[ pointsData.id ].remove();
        delete this.placePoints[ pointsData.id ];
      } );
  }


  createMap() {
    ( mapboxgl as any ).accessToken = 'pk.eyJ1IjoiZHJha29ueCIsImEiOiJja2FrMHppOGUwajMwMnluc21la3plaWNwIn0.kYLDRhMDvZfDiTM-3aS9Qg';
    this.map = new mapboxgl.Map( {
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -75.75512993582937, 45.349977429009954 ],
      zoom: 14.8
    } );

    for ( const [ id, placePoint ] of Object.entries( this.placePoints ) ) {
      this.aggregateMark( placePoint );
    }

  }

  aggregateMark( pointData: Place ) {

    // const html = `
    //   <h2>${ pointData.name }</h2>
    //   <button>Borrar</button>
    // `;

    const h2 = document.createElement( 'h2' );
    h2.innerText = pointData.name;

    const btnDelete = document.createElement( 'button' );
    btnDelete.innerText = 'Borrar';

    const div = document.createElement( 'div' );
    div.append( h2, btnDelete );

    const customPopup = new mapboxgl.Popup( {
      offset: 25,
      closeOnClick: false
    } ).setDOMContent( div );

    const marker = new mapboxgl.Marker( {
      draggable: true,
      color: pointData.colour
    } )
      .setLngLat( [ pointData.lng, pointData.lat ] )
      .setPopup( customPopup )
      .addTo( this.map );



    marker.on( 'drag', () => {
      const lngLat = marker.getLngLat();

      // // TODO: crar evento socket mover marcador
      this.wsService.emit( 'moveMarker', { ...pointData, lng: lngLat.lng, lat: lngLat.lat } );
    } );


    btnDelete.addEventListener( 'click', () => {
      marker.remove();

      // eliminar de todos los clientes
      this.wsService.emit( 'deleteMarker', pointData );
    } );

    this.markers[ pointData.id ] = marker;
  }

  createMark() {
    const customMarker: Place = {
      id: new Date().toISOString(),
      lng: -75.75195645527508,
      lat: 45.351584045823756,
      name: 'anonymous',
      colour: '#' + Math.floor( Math.random() * 16777215 ).toString( 16 )
    };

    this.aggregateMark( customMarker );

    this.wsService.emit( 'createMarker', customMarker );
  }
}

//pk.eyJ1IjoiZHJha29ueCIsImEiOiJja2FrMHppOGUwajMwMnluc21la3plaWNwIn0.kYLDRhMDvZfDiTM-3aS9Qg
