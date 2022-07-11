import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends React.Component {
  render() {
    // console.log(this.props);
    const { lat, long } = this.props.location;

    const mapStyles = {
      width: '50%',
      height: '50%',
      // width: '200px',
      // height: '200px',
    };
    return (
      <Map
        google={this.props.google}
        zoom={18}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: long }}
        className={'map-content'}
      >
        <Marker position={{ lat: lat, lng: long }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
