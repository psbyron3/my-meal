import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllInRadius } from '../actions/index';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Autocomplete from 'react-google-autocomplete';
import AdvancedSearch from '../components/advancedSearch.jsx';
import ReactDOM from 'react-dom';
import { Button, Overlay } from 'react-bootstrap';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    // this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  // onInputChange(event) {
  //   console.log('inputChange: ', event.target.value);
  //   this.setState({ query: event.target.value });
  // }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.getAllInRadius(this.state);
    console.log('state.query: ', this.state.query);
    this.setState({ query: '' });
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { fields: { searchbar, restrictions, genre }, handleSubmit } = this.props;
    return (
      <div className="nav-search">
        <form onSubmit={handleSubmit(this.props.getAllInRadius)} className="search-input">
          <div style={{ display: 'inline-block' }}>
            <Autocomplete
              {...searchbar}
              className="autoComplete"
              style={{ width: '90%' }}
              onPlaceSelected={(place) => { console.log(place); }}
              type="search"
              placeholder="Search Location"
            />
          </div>
          <Button ref="target" onClick={this.toggle}>
            &gt;
          </Button>
          <Overlay
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
            placement="right"
            container={this}
            target={() => ReactDOM.findDOMNode(this.refs.target)}
          >
            <AdvancedSearch />
          </Overlay>

        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllInRadius }, dispatch);
}

export default reduxForm({
  form: 'SearchBarForm',
  fields: ['searchbar', 'restrictions', 'genre'],
}, null, mapDispatchToProps)(SearchBar);

// <Autocomplete
//   {...searchbar}
//   className="autoComplete"
//   style={{ width: '90%' }}
//   onPlaceSelected={ (place) => { console.log(place); } }
//   type="search"
//   placeholder="Search Location"
//   value={this.state.query}
//   onChange={this.onInputChange}
// />
