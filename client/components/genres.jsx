import React, { Component } from 'react';

class GenreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderGenres = this.renderGenres.bind(this);
  }
  renderGenres() {
    return this.props;
  }

  render() {
    console.log('...........', this.props);
    return (
      <div>genres</div>
    );
  }
}

export default GenreMenu;
