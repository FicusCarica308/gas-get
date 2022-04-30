/* import logo from '../assets/logo.svg'; */
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DistanceMatrixService } from '@react-google-maps/api';
import React, { Component }from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './App.css';

const { REACT_APP_GOOGLE_MAPS_API_KEY, REACT_APP_GET_GAS_API_KEY } = process.env;

/* GOOGLE MAPS SETUP (CUSTOM HOOK FUNCTION) */
const withApiLoader = Component => props => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY
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
/* ========================================================*/

/* APP COMPONENT */

class App extends Component{
  constructor(props) {
    /* setup props and state along with function binding */
    super(props);
    this.state = {
      isGeoEnabled: false,
      currentGeo: {},
      combinedMPG: 0,
      stations: [],
      selectedStation: null,
      displayDistance: '',
    }
    this.getStations = this.getStations.bind(this);
    this.setCombinedMPG = this.setCombinedMPG.bind(this);
    this.setGeo = this.setGeo.bind(this);
    this.setDisplayDistance = this.setDisplayDistance.bind(this);
  }

  /* Setter function for setCombinedMPG state variables (passed into child component (Form)) */
  setCombinedMPG = (newCombinedMPG) => {
    this.setState({
      combinedMPG: newCombinedMPG
    });
  }

  /* Sets the current selectedStation */
  setSelectedStation(newStation) {
    this.setState( {
      selectedStation: newStation,
    });
  }

  /* setDisplayDistance */
  setDisplayDistance(newDistance) {
    this.setState({
      displayDistance: newDistance,
    });
  }

  /* Makes a GET call to the backend API for the gas stations from closest to farthest  and sets the state */
  getStations(lat, lng) {
    //return;
    axios({
      method: 'get',
      url: `https://get-gas-api.herokuapp.com/stations/${REACT_APP_GET_GAS_API_KEY}/${lat}/${lng}`,
    })
    .then(response => {
      const stationsList = response.data;
      this.setState({ stations: stationsList });
    })
  }

  /* Sets the current geographical cords of the user in this.state + calls this.getStations with the same values */
  setGeo() {
    navigator.geolocation.getCurrentPosition((position) => { /*switch to watchPosition in production */
      this.setState({
        currentGeo: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
      this.getStations(position.coords.latitude, position.coords.longitude);
      /* Checks if user enabled geolocation or not */
      // if (Object.keys(this.state.currentGeo).length === 0) {
        // alert('Location services must be enabled !');
      // }
    });
  }

  /* Checks the users browser to determine if geolocation is avaliable + calls this.setGeo */
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
        /* Causes error if you dont pass an object with explicit {lat: "", lng: ""} propertis */
        center={
          this.state.selectedStation ? (
            {lat: this.state.selectedStation.latitude, lng: this.state.selectedStation.longitude}
          ) : (
            {lat: this.state.currentGeo.lat, lng: this.state.currentGeo.lng}
          )
        }
        zoom={12}
        onLoad={this.props.onLoad}
        onUnmount={this.props.onUnmount}
        >
          <Marker position={{...this.state.currentGeo}}>
          </Marker>
          {
            this.state.stations.map(station =>
              <Marker
                key={station.place_id}
                position={{lat: station.latitude, lng: station.longitude}}
                onClick={() => { this.setSelectedStation(station) }}
                icon={{
                  url: '/gasStationMarker.png',
                  scaledSize: new window.google.maps.Size(50, 50)
                }}
              />
            )
          }
          {this.state.selectedStation && (
            <InfoWindow
              position={{
                lat: this.state.selectedStation.latitude,
                lng: this.state.selectedStation.longitude
              }}
              onCloseClick={() => this.setSelectedStation(null)}
            >
              <div>
                <h3>Gas Station</h3>
                <p>Name: {this.state.selectedStation.name}</p>
                <DistanceMatrixService
                  options={{
                            destinations: [{lat: this.state.selectedStation.latitude, lng: this.state.selectedStation.longitude}],
                            origins: [{lng: this.state.currentGeo.lng, lat: this.state.currentGeo.lat}],
                            travelMode: "DRIVING",
                            //eslint-disable-next-line no-undef
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                          }}
                  callback = {(response) => {this.setDisplayDistance(response.rows[0].elements[0].distance.text)}}
                />
                <p>{this.state.displayDistance}</p>
                <p>Longitude: {this.state.selectedStation.longitude}</p>
                <p>Latitude: {this.state.selectedStation.latitude}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
        <Footer />
      </div>
    ) : <></>;
  }
}

export default withApiLoader(App);
/* onClick={() => {setSelectedStation(station)}} */