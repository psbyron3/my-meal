import React, { Component, PropTypes } from 'react';
import { getAllInRadius, getAllTags } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import RestrictionMenu from '../components/restrictions.jsx';
import GenreMenu from '../components/genres.jsx';
import DistanceMenu from '../components/distances.jsx';
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
                   distance: 5,
                   wasChecked: false,
                 };
    this.onTextChange = this.onTextChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onGenreChange = this.onGenreChange.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    this.props.getAllTags();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.wasChecked) {
      this.setState({
        restrictions: nextProps.Tags.map(tag => tag.id),
      });
    }
  }

  onTextChange(event) {
    console.log('textChange: ', event.target.value);
    this.setState({ query: event.target.value }, () => { console.log('changed text'); });
  }

  onCheckChange(event) {
    event.target.blur();
    this.setState({
      wasChecked: true,
    });
    const index = this.state.restrictions.indexOf(Number(event.target.value));
    const copy = this.state.restrictions.slice();
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(Number(event.target.value));
    }
    this.setState({ restrictions: copy }, () => {
      console.log('this.state = ', this.state);
    });
  }

  onGenreChange(event) {
    this.setState({
      genre: [event.target.value],
    }, () => {
      console.log('this.state =', this.state);
    });
  }

  onDistanceChange(event) {
    this.setState({
      distance: event.target.value,
    }, () => {
      console.log('this.state =', this.state);
    });
  }

  onEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  // when state is reset in last line, make sure to reset restrictions to user preferences
  onFormSubmit(place) {
    this.setState({
      query: place.formatted_address || this.state.query,
    });

    console.log('query:', this.state.query);
    const tags = [...this.state.restrictions, ...this.state.genre];
    console.log('params: ', tags);
    const distance = this.state.distance;
    this.props.getAllInRadius(this.state.query, tags, distance);
    // do we want to reset the state though?
    this.setState({ show: false, genre: [] });
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    console.log('this.state.restrictions is...: ', this.state.restrictions);
    return (
      <div className="nav-search" >
        <form className="search-input">
          <div style={{ display: 'inline-block' }}>
            <Autocomplete
              className="autoComplete"
              style={{ width: '90%' }}
              onPlaceSelected={(place) => this.onFormSubmit(place)}
              type="search"
              placeholder="Search Location"
              value={this.state.query}
              onChange={this.onTextChange}
              onKeyDown={this.onEnter}
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
                selectedGenre={this.state.genre}
                genres={this.props.genres}
              />
              <DistanceMenu
                onDistanceChange={this.onDistanceChange}
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
    Tags: state.userInfo.Tags,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllInRadius, getAllTags }, dispatch);
}

SearchBar.propTypes = {
  restrictions: PropTypes.array,
  genres: PropTypes.array,
  getAllInRadius: PropTypes.func,
  getAllTags: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
