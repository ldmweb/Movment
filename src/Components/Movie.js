import React from "react";
import Modal from "react-modal";
import Columns from "react-bulma-components/lib/components/columns";

import "./Movie.scss";

class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  viewMovie() {
    console.log("Trying to view movie");
    console.log(this.props.movie.title);
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
    window.location.href = url;
  }

  render() {
    return (
      <div className="movieCard">
        <img
          className="imgCard hvr-sweep-to-top"
          src={"https://image.tmdb.org/t/p/w185" + this.props.movie.poster_path}
          onClick={this.handleOpenModal.bind(this)}
          alt="Movie Cover"
        />
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className="Modal"
          overlayClassName="Overlay"
          onRequestClose={this.handleCloseModal}
        >
          <Columns
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${this.props.movie.backdrop_path})`,
              zIndex: 1,
            }}
            className="headerModal"
            onClick={this.handleCloseModal}
          ></Columns>
          <Columns className="modalInfos">
            <Columns.Column className="columnThumbnail" size="one-quarter">
              <img
                src={
                  "https://image.tmdb.org/t/p/w185" +
                  this.props.movie.poster_path
                }
                className="thumbnail"
                alt="Poster"
              />
            </Columns.Column>
            <Columns.Column>
              <Columns>
                <Columns.Column>
                  <h1 className="filmTitle">{this.props.movie.title}</h1>
                  <strong>Release Date : </strong>{" "}
                  {this.props.movie.release_date}
                </Columns.Column>
                <Columns.Column>
                  <strong>Rated : </strong> {this.props.movie.vote_average}/10
                </Columns.Column>
                <Columns.Column>
                  <strong>Popularity : </strong> {this.props.movie.popularity}
                </Columns.Column>
              </Columns>
              <Columns>
                <Columns.Column className="columnOverview">
                  <strong>Overview:</strong> {this.props.movie.overview}
                </Columns.Column>
              </Columns>
              <Columns>
                <Columns.Column className="columnOverview">
                  <button
                    onClick={this.viewMovie.bind(this)}
                    className="buttonFilm"
                  >
                    View Movie
                  </button>
                </Columns.Column>
              </Columns>
            </Columns.Column>
          </Columns>
        </Modal>
      </div>
    );
  }
}

export default Movie;
