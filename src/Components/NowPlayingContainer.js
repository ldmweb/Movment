import React, { Component } from "react";

import NowPlayingMovie from "./NowPlayingMovie";
import "./NowPlayingContainer.scss";

export class NowPlayingContainer extends Component {
  render() {
    const { movies } = this.props;
    let content = "";

    content = movies.map((movie) => (
      <NowPlayingMovie key={movie.id} movie={movie} />
    ));
    return <div>{content}</div>;
  }
}

export default NowPlayingContainer;
