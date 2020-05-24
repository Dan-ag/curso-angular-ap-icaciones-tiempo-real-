
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Place } from 'src/app/interfaces/place';
import { ThrowStmt } from '@angular/compiler';
import { WebSocketService } from 'src/services/websocket.service';
import { HttpClient } from '@angular/common/http';

@Component( {
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
} )
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild( 'map', { static: false } ) mapElement: ElementRef;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];

  pointsData: Place[] = [
    {
      name: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      name: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      name: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];

  constructor( private http: HttpClient, public wsService: WebSocketService ) { }

  ngOnInit(): void {

    this.listenerSocketEvent();
  }

  ngAfterViewInit() {
    this.http.get<Place[]>( 'http://10.42.0.41:3000/map' )
      .subscribe( ( pointsData: Place[] ) => {
        this.pointsData = pointsData;
        this.loadMap();
      } );
  }

  listenerSocketEvent() {
    // create-marker
    this.wsService.listen( 'add-marker' )
      .subscribe( ( pointsData: Place ) => {
        console.log( 'Add marker!', pointsData );
        this.addMarker( pointsData );
      } );

    // move-marker
    this.wsService.listen( 'move-marker' )
      .subscribe( ( pointData: Place ) => {
        console.log( 'Move marker!', pointData );

        this.pointsData.some( ( pointDataEl, index ) => {

          if ( pointDataEl.id === pointData.id ) {
            pointDataEl.lat = pointData.lat;
            pointDataEl.lng = pointData.lng;

            this.markers[ index ].setPosition( { lat: pointData.lat, lng: pointData.lng } );
            return true;
          }
          return false;
        } );

        // this.markers[ pointsData.id ].setLngLat( { lng: pointsData.lng, lat: pointsData.lat } );
      } );

    // delete-marker
    this.wsService.listen( 'delete-marker' )
      .subscribe( ( pointData: Place ) => {
        console.log( 'Delete marker!', pointData );

        this.pointsData = this.pointsData.filter( ( pointDataEl, index ) => {
          if ( pointDataEl.id === pointData.id ) {
            this.markers[ index ].setMap( null );
            this.markers.splice( index, 1 );
            return false;
          }
          return true;
        } );
      } );
  }

  loadMap() {
    const latLng = new google.maps.LatLng( 37.785679, -122.395936 );

    const mapOptions: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map( this.mapElement.nativeElement, mapOptions );

    this.map.addListener( 'click', ( coords: any ) => {
      const newPlace: Place = {
        name: 'Nuevo lugar.',
        lat: coords.latLng.lat(),
        lng: coords.latLng.lng(),
        id: new Date().toISOString()
      };

      this.addMarker( newPlace );

      // Event socket add marker
      this.wsService.emit( 'add-marker', newPlace );

    } );

    for ( const place of this.pointsData ) {
      this.addMarker( place );
    }
  }

  addMarker( place: Place ) {
    const latlng = new google.maps.LatLng( place.lat, place.lng );
    const marker = new google.maps.Marker( {
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latlng,
      draggable: true,
    } );

    this.markers.push( marker );

    const constentMarker = `<b>${ place.name }</b>`;
    marker[ 'infoWindow' ] = new google.maps.InfoWindow( {
      content: constentMarker
    } );

    google.maps.event.addDomListener( marker, 'click', () => {

      this.markers.forEach( markerEl => {
        markerEl[ 'infoWindow' ].close();
      } );

      marker[ 'infoWindow' ].open( this.map, marker );
    } );

    google.maps.event.addDomListener( marker, 'dblclick', ( coors ) => {
      marker.setMap( null );
      console.log( coors );

      this.wsService.emit( 'delete-marker', place );

    } );

    google.maps.event.addDomListener( marker, 'drag', ( coors: any ) => {
      const newPlace = {
        ...place,
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
      };

      this.wsService.emit( 'move-marker', newPlace );

    } );
  }

}
