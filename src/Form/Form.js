import React, { Component } from 'react';
import './Form.css'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    alert('Current State: ' + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
      <form id='car-info-form' onSubmit={this.handleSubmit}>
        <label id='make-label'>
          Make:
          <input id="make" name='make' type="text" value={this.state.make} onChange={this.handleChange} />
        </label>
        <label id='model-label'>
          Model:
          <input id="model" name='model' type="text" value={this.state.model} onChange={this.handleChange} />
        </label>
        <label id='year-label'>
          Year:
          <input id="year" name='year' type="text" value={this.state.year} onChange={this.handleChange} />
        </label>
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
