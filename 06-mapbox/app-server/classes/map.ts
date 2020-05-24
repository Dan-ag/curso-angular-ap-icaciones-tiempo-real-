import { Marker } from './mark';

export class Map {
  private markers: { [ key: string ]: Marker; } = {
    '1': {
      id: '1',
      name: 'Yeindia',
      lng: -75.75512993582937,
      lat: 45.349977429009954,
      colour: '#dd8fee'
    },
    '2': {
      id: '2',
      name: 'Danilo',
      lng: -75.75195645527508,
      lat: 45.351584045823756,
      colour: '#790af0'
    },
    '3': {
      id: '3',
      name: 'Camilo',
      lng: -75.75900589557777,
      lat: 45.34794635758547,
      colour: '#19884b'
    }
  };


  constructor() { }

  getMarkers() {
    return this.markers;
  }

  addMarker( marker: Marker ) {
    this.markers[ marker.id ] = marker;
  }

  deleteMarkerById( id: string ) {
    delete this.markers[ id ];
    return this.getMarkers();
  }

  moveMarker( marker: Marker ) {
    this.markers[ marker.id ].lng = marker.lng;
    this.markers[ marker.id ].lat = marker.lat;
  }

}
