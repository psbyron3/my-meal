import React, { Component, PropTypes } from 'react';

class GenreMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderGenres = this.renderGenres.bind(this);
  }
  renderGenres() {
    console.log('current genre:', typeof this.props.selectedGenre);
    return this.props.genres.map((genre) => {
      return (
        <option key={genre.id} value={genre.id}>
          {genre.tagName}
        </option>
      );
    });
  }

  render() {
    console.log('...........', this.props);
    return (
      <div>
        <select onChange={this.props.onGenreChange}>
          <option selected disabled>Select a type of food</option>
          {this.renderGenres()}
        </select>
      </div>
    );
  }
}

GenreMenu.propTypes = {
  selectedGenre: PropTypes.array,
  genres: PropTypes.array,
  onGenreChange: PropTypes.func,
};

export default GenreMenu;
