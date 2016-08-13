import React, { Component } from 'react';
import { getAllInRadius, getAllTags } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import RestrictionMenu from '../components/restrictions.jsx';
import GenreMenu from '../components/genres.jsx';
import ReactDOM from 'react-dom';
import { Button, Overlay } from 'react-bootstrap';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // state.restrictions eventually pre-populated from user profile
    this.state = { show: false,
                   query: '',
                   restrictions: [],
                   genre: [],
                 };
    this.onTextChange = this.onTextChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onGenreChange = this.onGenreChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getAllTags();
  }

  onTextChange(event) {
    console.log('textChange: ', event.target.value);
    this.setState({ query: event.target.value });
  }

  onCheckChange(event) {
    // console.log('checkChange:', typeof event.target.value);
    event.target.blur();
    const index = this.state.restrictions.indexOf(Number(event.target.value));
    const copy = this.state.restrictions.slice();
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(Number(event.target.value));
    }
    // if yes, splice it out of copy
    // if no, push it into copy
    // then replace state with new array
    this.setState({ restrictions: copy }, () => {
      console.log('current restrictions-_-_-_-_->:', this.state.restrictions);
    });
  }

  onGenreChange(event) {
    console.log('genreChange:', event.target.value);
    // simply replace state with event.target.value ([event.target.value]);
    this.setState({});
  }

  // when state is reset in last line, make sure to reset restrictions to user preferences
  onFormSubmit() {
    console.log('params: ', this.state.tags);
    console.log('query:', this.state.query);
    const tags = [...this.state.restrictions, ...this.state.genre];
    this.props.getAllInRadius(this.state.query, tags);
    this.setState({ query: '', restrictions: [], genre: [] });
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div className="nav-search">
        <form onSubmit={this.onFormSubmit} className="search-input">
          <div style={{ display: 'inline-block' }}>
            <Autocomplete
              className="autoComplete"
              style={{ width: '90%' }}
              onPlaceSelected={(place) => { console.log(place); }}
              type="search"
              placeholder="Search Location"
              value={this.state.query}
              onChange={this.onTextChange}
            />
          </div>
          <Button id="searchButton" ref="target" onClick={this.toggle}>
            &gt;
          </Button>
          <Overlay
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
            placement="right"
            container={this}
            rootClose
            target={() => ReactDOM.findDOMNode(this.refs.target)}
          >
            <div id="advancedSearch">
              <RestrictionMenu
                onCheckChange={this.onCheckChange}
                selectedRestrictions={this.state.restrictions}
                restrictions={this.props.restrictions}
              />
              <GenreMenu
                onGenreChange={this.onGenreChange}
                selectedGenres={this.state.genres}
                genres={this.props.genres}
              />
            </div>
          </Overlay>
        </form>
      </div>
    );
  }
}

// SearchBar.propTypes = {
//
// }

function mapStateToProps(state) {
  return {
    restrictions: state.tags.restrictions,
    genres: state.tags.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllInRadius, getAllTags }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

// <Overlay
//   show={this.state.show}
//   onHide={() => this.setState({ show: false })}
//   placement="right"
//   container={this}
//   rootClose={true}
//   target={() => ReactDOM.findDOMNode(this.refs.target)}
// >
