import React, { Component } from "react";

import UpcomingMovie from "./upcomingMovie";
import "./UpcomingContainer.scss";

export class UpcomingContainer extends Component {
  render() {
    const { movies } = this.props;
    let content = "";

    content = movies.map((movie) => (
      <UpcomingMovie key={movie.id} movie={movie} />
    ));
    return <div>{content}</div>;
  }
}

export default UpcomingContainer;
