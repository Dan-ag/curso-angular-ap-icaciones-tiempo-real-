import { PlaceData } from './PlaceData';

export class Map {
  private placesData: PlaceData[] = [
    {
      id:'1',
      name: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      id:'2',
      name: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      id:'3',
      name: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];


  constructor() { }

  // Get Marker
  getMarkers() {
    return this.placesData;
  }

  // Add Marker
  addMarker( marker: PlaceData ) {
    this.placesData.push( marker );
  }

  // Delete Marker
  deleteMarkerById( id: string ) {

    this.placesData = this.placesData.filter( placeData => placeData.id !== id );

    return this.getMarkers();
  }

  // Move Marker
  moveMarker( marker: PlaceData ) {

    this.placesData.some( placeData => {

      if ( placeData.id === marker.id) {
        placeData.lat = marker.lat;
        placeData.lng = marker.lng;
        return true;
      }
      return false;
    } )
  }
}
