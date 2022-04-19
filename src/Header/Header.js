/* Header component */
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import React, { useEffect } from 'react';
import PlaceInput from '../PlaceInput/PlaceInput';
import './Header.css';
import { GOOGLE_MAPS_API_KEY } from '../private-config';

const libraries = ['places'];

function Header() {
  const originPlace = React.useRef('initial');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries
  });

  return isLoaded ? (
    <header className="App-header">
      <Autocomplete>
        <PlaceInput labelValue={'Location'} originPlace={originPlace}/>
      </Autocomplete>
    </header>
  ) : <></>
}

export default Header;
