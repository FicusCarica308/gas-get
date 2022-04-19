/* import logo from '../assets/logo.svg'; */
/* import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'; */
import React from 'react';
import Header from '../Header/Header'
import './App.css';

function App() {
  const originPlace = React.useRef('initial');

  return (
    <div className="App">
      <header className="App-header">
        <Header originPlace={originPlace}/>
      </header>
    </div>
  );
}

export default App;


/*
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
*/