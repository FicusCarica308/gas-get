/* import logo from '../assets/logo.svg'; */
import { GOOGLE_MAPS_API_KEY } from '../private-config';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { Component }from 'react';
import Header from '../Header/Header'
import './App.css';

const withApiLoader = Component => props => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  /* const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);
  */

  return <Component {...props} isLoaded={isLoaded} />;
};

function getBestStation() {
  // eslint-disable-next-line no-undef
  const origin1 = new google.maps.LatLng(55.930385, -3.118425);
  // eslint-disable-next-line no-undef
  let destination1= new google.maps.LatLng(50.087692, 14.421150);
  // eslint-disable-next-line no-undef
  let service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destination1],
      travelMode: 'DRIVING',
    }, callback);

  function callback(response, status) {
    console.log(response);
  }

  

}

const containerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: -3.745,
  lng: -38.523
};

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isGeoEnabled: false,
      currentGeo: {},
    }
  }

  setGeo() {
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        currentGeo: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
      /* Checks if user enabled geolocation or not */
      // if (Object.keys(this.state.currentGeo).length === 0) {
        // alert('Location services must be enabled !');
      // }
    });
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("Geolocation Available");
      this.setState({ isGeoEnabled: true });
      this.setGeo()
    } else {
      console.log("Geolocation is Not available");
      this.setState({ isGeoEnabled: false })
    }
  }

  render() {
    return this.props.isLoaded ? (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        //onLoad={this.props.onLoad}
        //onUnmount={this.props.onUnmount}
        >
        </GoogleMap>
      </div>
    ) : <></>;
  }
}

export default withApiLoader(App);