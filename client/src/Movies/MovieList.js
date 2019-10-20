import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  getMovies = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => window.location.reload(true))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails
            key={movie.id}
            movie={movie}
            handleDelete={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie, handleDelete }) {
  return (
    <>
      <Link to={`/movies/${movie.id}`}>
        <MovieCard movie={movie} />
      </Link>
      <button onClick={() => handleDelete(movie.id)}>Delete Movie</button>
    </>
  );
}
