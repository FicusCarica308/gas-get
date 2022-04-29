/* import logo from '../assets/logo.svg'; */
import { GOOGLE_MAPS_API_KEY } from '../private-config';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { Component }from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './App.css';

const withApiLoader = Component => props => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = React.useState(null); 

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  return <Component {...props} isLoaded={isLoaded} />;
};

const containerStyle = {
  width: '75vw',
  height: '68.3vh',
  borderLeft: '5px double black',
  borderRight: '5px double black'
};

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isGeoEnabled: false,
      currentGeo: {},
      combinedMPG: 0,
    }
  }

  setCombinedMPG = (newCombinedMPG) => {
    this.setState({
      combinedMPG: newCombinedMPG
    });
  }

  setGeo() {
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        currentGeo: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
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
        <Header setCombinedMPG={this.setCombinedMPG} combinedMPG={this.state.combinedMPG}/>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={{...this.state.currentGeo}}
        zoom={12}
        onLoad={this.props.onLoad}
        onUnmount={this.props.onUnmount}
        >
        </GoogleMap>
        <Footer />
      </div>
    ) : <></>;
  }
}

export default withApiLoader(App);