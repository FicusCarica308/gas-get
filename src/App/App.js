/* import logo from '../assets/logo.svg'; */
/* import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'; */
import React, { Component }from 'react';
import Header from '../Header/Header'
import './App.css';

export default class App extends Component{

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
      if (Object.keys(this.state.currentGeo).length === 0) {
        alert('Location services must be enabled !');
      }
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
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
      </div>
    );
  }
}
