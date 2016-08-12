import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllInRadius, getAllTags } from '../actions/index';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Autocomplete from 'react-google-autocomplete';
import RestrictionMenu from '../components/restrictions.jsx';
import GenreMenu from '../components/genres.jsx';
import ReactDOM from 'react-dom';
import { Button, Overlay } from 'react-bootstrap';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false,
                   query: '',
                 };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getAllTags();
  }

  onInputChange(event) {
    console.log('inputChange: ', event.target.value);
    this.setState({ query: event.target.value });
  }

  onFormSubmit(params) {
    this.props.getAllInRadius(this.state.query, params);
    console.log('params: ', params);
    console.log('query:', this.state.query);
    this.setState({ query: '' });
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { fields: { restriction, genre }, handleSubmit } = this.props;
    return (
      <div className="nav-search">
        <form onSubmit={handleSubmit(this.onFormSubmit)} className="search-input">
          <div style={{ display: 'inline-block' }}>
            <Autocomplete
              className="autoComplete"
              style={{ width: '90%' }}
              onPlaceSelected={(place) => { console.log(place); }}
              type="search"
              placeholder="Search Location"
              value={this.state.query}
              onChange={this.onInputChange}
            />
          </div>
          <Button
            id="searchButton"
            ref="target"
            onClick={this.toggle}
          >
            &gt;
          </Button>
          <Overlay
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
            placement="right"
            container={this}
            target={() => ReactDOM.findDOMNode(this.refs.target)}
          >
            <div id="advancedSearch">
              <RestrictionMenu
                {...restriction}
                restrictions={this.props.restrictions}
              />
              <GenreMenu
                {...genre}
                genres={this.props.genres}
              />
            </div>
          </Overlay>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    restrictions: state.tags.restrictions,
    genres: state.tags.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllInRadius, getAllTags }, dispatch);
}

export default reduxForm({
  form: 'SearchBarForm',
  fields: ['searchbar', 'restriction', 'genre'],
}, mapStateToProps, mapDispatchToProps)(SearchBar);
