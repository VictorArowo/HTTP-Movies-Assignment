import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import UpdateMovie from './Movies/UpdateMovie';
import axios from 'axios';

const App = () => {
  const [movieList, setMovieList] = useState(null);
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  }, []);
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              addToSavedList={addToSavedList}
              movieList={movieList}
              setMovieList={setMovieList}
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateMovie
              {...props}
              movieList={movieList}
              setMovieList={setMovieList}
            />
          );
        }}
      />
    </>
  );
};

export default App;
