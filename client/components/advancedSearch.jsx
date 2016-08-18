import React, { Component } from 'react';
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
      <div style={{ display: 'inline-block' }}>
        <Button id="searchButton" ref="target" onClick={this.props.toggle}>
          &gt;
        </Button>
        <Overlay
          show={this.props.show}
          onHide={this.props.toggle}
          placement="right"
          container={this}
          rootClose
          target={() => ReactDOM.findDOMNode(this.refs.target)}
        >
          <div id="advancedSearch">
            <RestrictionMenu
              onCheckChange={this.props.onCheckChange}
              selectedRestrictions={this.props.selectedRestrictions}
              restrictions={this.props.restrictions}
            />
            <GenreMenu
              onGenreChange={this.props.onGenreChange}
              selectedGenre={this.props.selectedGenre}
              genres={this.props.genres}
            />
            <DistanceMenu
              onDistanceChange={this.props.onDistanceChange}
              distance={this.props.distance}
            />
          </div>
        </Overlay>
      </div>
    );
  }
}

export default AdvancedSearch;
