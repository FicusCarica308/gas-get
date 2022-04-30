/* Header component */
import React from 'react';
import Form from '../Form/Form';
import logo from '../assets/logo_v3.png';
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      combinedMPG: this.props.combinedMPG,
    };
  }
  render() {
    return (
      <header className="App-header">
        <img alt="get-gas-logo" src={logo} id="logo-img"></img>
        <div>
          <h1>Combined MPG:</h1>
          <h2>{this.props.combinedMPG}</h2>
        </div>
        <Form setCombinedMPG={this.props.setCombinedMPG}/>
      </header>
    );
  }
}
