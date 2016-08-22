import React, { Component, PropTypes } from 'react';
import RestrictionMenu from './restrictions.jsx';
import GenreMenu from './genres.jsx';
import DistanceMenu from './distances.jsx';
import ReactDOM from 'react-dom';
import { Button, Overlay } from 'react-bootstrap';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id="advancedSearch">
        <div id="searchButton">
          <a ref="target" onClick={this.props.toggle}>
            More search options...
          </a>
        </div>
        <Overlay
          id="searchOverlay"
          show={this.props.show}
          onHide={this.props.toggle}
          placement="bottom"
          container={this}
          target={() => ReactDOM.findDOMNode(this.refs.target)}
        >
          <div id="searchMenu">
            <div id="restrictions">
              <RestrictionMenu
                onCheckChange={this.props.onCheckChange}
                selectedRestrictions={this.props.selectedRestrictions}
                restrictions={this.props.restrictions}
              />
            </div>
            <div id="genreMenu">
              <GenreMenu
                onGenreChange={this.props.onGenreChange}
                selectedGenre={this.props.selectedGenre}
                genres={this.props.genres}
              />
            </div>
            <div id="distanceMenu">
              <DistanceMenu
                onDistanceChange={this.props.onDistanceChange}
                distance={this.props.distance}
              />
            </div>
          </div>
        </Overlay>
      </div>
    );
  }
}

AdvancedSearch.propTypes = {
  toggle: PropTypes.func,
  show: PropTypes.bool,
  onCheckChange: PropTypes.func,
  selectedRestrictions: PropTypes.array,
  restrictions: PropTypes.array,
  onGenreChange: PropTypes.func,
  selectedGenre: PropTypes.number,
  genres: PropTypes.array,
  onDistanceChange: PropTypes.func,
  distance: PropTypes.number,
};

export default AdvancedSearch;
