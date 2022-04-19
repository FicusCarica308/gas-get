/* Place Input form component (Google API) */
import React from 'react';
import './PlaceInput.css';

class PlaceInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(event) {
    event.preventDefault();
    alert(this.props.originPlace.current);
  }

  render() {
    return (
      <form className="App-PlaceInput" onSubmit={this.handleRef}>
        <label htmlFor="destination">{this.props.labelValue}:</label><br></br>
        <h1>{this.props.originPlace.current}</h1>
        <input type="text" id="destination" name="destination"></input>
      </form>
    );
  }
}

/* add proptypes */
// ref
// labelValue

export default PlaceInput;
