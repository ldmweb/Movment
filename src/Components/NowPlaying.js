import React from "react";
import Columns from "react-bulma-components/lib/components/columns";

import "./NowPlaying.scss";
import NowPlayingContainer from "./NowPlayingContainer";

class NowPlaying extends React.Component {
  render() {
    const { movies } = this.props;
    return (
      <Columns.Column className="NowPlaying">
        <Columns>
          <Columns.Column>
            <h2 className="NowPlayingTitle">NowPlaying in Theaters</h2>
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column>
            {" "}
            <NowPlayingContainer movies={movies}></NowPlayingContainer>
          </Columns.Column>
        </Columns>
        {/* <Link
              className="btn btn-primary"
              to={"/movie/" + this.props.movie.imdbID}
            >
              Movie Details
              <i className="fas fa-chevron-right" />
            </Link> */}
      </Columns.Column>
    );
  }
}

export default NowPlaying;
