import React, { Component } from "react";

import Movie from "./Movie.js";
import "./MovieContainer.scss";

export class MoviesContainer extends Component {
  render() {
    const { movies } = this.props;
    let content = "";

    content = movies.map((movie) => <Movie key={movie.id} movie={movie} />);
    return <div className="movieContainer">{content}</div>;
  }
}

export default MoviesContainer;
