import React from 'react';
import './Form.css';
import axios from 'axios';

const { REACT_APP_GET_GAS_API_KEY } = process.env;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: '',
      combinedMPG: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCombinedMPG = this.getCombinedMPG.bind(this);
  }

  getCombinedMPG(make, model, year) {
    axios({
      method: 'get',
      url: `https://get-gas-api.herokuapp.com/specs/${REACT_APP_GET_GAS_API_KEY}/combination_mpg/${make}/${model}/${year}`,
    })
    .then(response => {
      const carData = response.data;
      this.props.setCombinedMPG(carData.combination_mpg);
    })
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    alert('Current State: ' + JSON.stringify(this.state));
    this.getCombinedMPG(this.state.make, this.state.model, this.state.year);
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
