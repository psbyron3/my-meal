import React, { Component, PropTypes } from 'react';

const GenreMenu = ({ selectedGenre, genres, onGenreChange }) => {
  const renderGenres = () => (
    genres.map(genre => (
      <option key={genre.id} value={genre.id}>
        {genre.tagName}
      </option>
    ))
  );

  return (
    <div>
      <select onChange={onGenreChange} value={selectedGenre}>
        <option value={0}>Select a type of food</option>
        {renderGenres()}
      </select>
    </div>
  );
};

GenreMenu.propTypes = {
  selectedGenre: PropTypes.number,
  genres: PropTypes.array,
  onGenreChange: PropTypes.func,
};

export default GenreMenu;
