import React, { Component, PropTypes } from 'react';
import { getAllInRadius, getAllTags } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import AdvancedSearch from '../components/advancedSearch';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      query: '',
      restrictions: [],
      genre: 0,
      distance: 0,
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
    if (!this.state.wasChecked && nextProps.Tags) {
      this.setState({
        restrictions: nextProps.Tags.map(tag => tag.id),
      });
    }
  }

  onTextChange(event) {
    console.log('textChange: ', event.target.value);
    this.setState({ query: event.target.value });
  }

  onCheckChange(event) {
    event.target.blur();
    this.setState({ wasChecked: true });
    const index = this.state.restrictions.indexOf(Number(event.target.value));
    const copy = this.state.restrictions.slice();
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(Number(event.target.value));
    }
    this.setState({ restrictions: copy });
  }

  onGenreChange(event) {
    this.setState({
      genre: event.target.value,
    });
  }

  onDistanceChange(event) {
    this.setState({
      distance: event.target.value,
    });
  }

  onEnter(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  onFormSubmit(place) {
    const genre = +this.state.genre ? [+this.state.genre] : [];
    const tags = [...this.state.restrictions, ...genre];
    const distance = +this.state.distance || 5;
    this.setState({ query: place.formatted_address || this.state.query });
    this.props.getAllInRadius(this.state.query, tags, distance);
    this.setState({ show: false, genre: [] });
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
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
          <AdvancedSearch
            show={this.state.show}
            toggle={this.toggle}
            onCheckChange={this.onCheckChange}
            selectedRestrictions={this.state.restrictions}
            restrictions={this.props.restrictions}
            onGenreChange={this.onGenreChange}
            selectedGenre={this.state.genre}
            genres={this.props.genres}
            onDistanceChange={this.onDistanceChange}
            distance={this.state.distance}
          />
        </form>
      </div>
    );
  }
}

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
