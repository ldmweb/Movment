import React from "react";
import Columns from "react-bulma-components/lib/components/columns";

import "./Upcoming.scss";
import UpcomingContainer from "./UpcomingContainer";

class Upcoming extends React.Component {
  render() {
    const { movies } = this.props;
    return (
      <Columns.Column className="upcoming">
        <Columns>
          <Columns.Column>
            <h2 className="upcomingTitle">Upcoming in Theaters</h2>
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column>
            {" "}
            <UpcomingContainer movies={movies}></UpcomingContainer>
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

export default Upcoming;
