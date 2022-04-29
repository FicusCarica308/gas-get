/* Header component */
import React from 'react';
import Form from '../Form/Form';
import './Header.css';

export default function Header(props) {
  return (
    <header className="App-header">
      <h2> Gas-Get </h2>
      <Form />
    </header>
  );
}
