// src/App.js
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieAdd from './components/MovieAdd';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [fetchedMovies, setFetchedMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from TMDb API
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: 'c0a9750e00cffc2dab5fc345015020d5',
      },
    })
      .then(response => setFetchedMovies(response.data.results))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleAdd = (newMovie) => {
    // Add the new movie to the movies state
    setMovies([...movies, { id: Date.now(), title: newMovie }]);
  };

  const handleDelete = (movieId) => {
    console.log('Deleting movie with ID:', movieId);
    // Implement logic to delete the movie with the given ID
    // For simplicity, let's filter out the movie with the specified ID
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    console.log('Updated movies:', updatedMovies);
    setMovies(updatedMovies);
  };

  // Combine the fetched movies with the user-added movies
  const allMovies = [...fetchedMovies, ...movies];

  return (
    <div>
      <MovieList movies={allMovies} onDelete={handleDelete} />
      <MovieAdd onAdd={handleAdd} />
    </div>
  );
};

export default App;
