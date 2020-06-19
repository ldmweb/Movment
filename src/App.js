import React, { Component } from "react";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import "./App.scss";
import MovieContainer from "./Components/MovieContainer.js";
import Header from "Components/Header";
import Search from "Components/Search";
import NowPlaying from "Components/NowPlaying";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      NowPlaying: [],
      page: 1,
      searching: false,
      query: "",
      filter: "popular",
      popular: true,
      rated: false,
      upcoming: false,
    };
  }

  componentDidMount() {
    this.getMovies();
    this.getNowPlayingMovies();
  }

  getMovies = () => {
    this.setState({ page: 1 });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/` +
          this.state.filter +
          `?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&page=1`
      )
      .then((res) => {
        const temp = [];
        res.data.results.map((movie) => {
          if (movie.poster_path !== null) {
            temp.push(movie);
          }
        });
        this.setState({ movies: temp });
      });
  };

  fetchMovies = () => {
    this.setState({ page: this.state.page + 1 });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/` +
          this.state.filter +
          `?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&page=` +
          this.state.page
      )
      .then((res) => {
        const temp = [];
        res.data.results.map((movie) => {
          if (movie.poster_path !== null) {
            temp.push(movie);
          }
        });
        this.setState({ movies: this.state.movies.concat(temp) });
      });
  };

  searchMovies = (query) => {
    this.setState({ page: 1 });
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&query=` +
          query +
          `&page=1`
      )
      .then((res) => {
        const temp = [];
        res.data.results.map((movie) => {
          if (movie.poster_path !== null) {
            temp.push(movie);
          }
        });
        this.setState({ movies: temp });
      });
  };

  fetchMoviesSearch = () => {
    this.setState({ page: this.state.page + 1 });
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&query=` +
          this.state.query +
          `&page=` +
          this.state.page
      )
      .then((res) => {
        const temp = [];
        res.data.results.map((movie) => {
          if (movie.poster_path !== null) {
            temp.push(movie);
          }
        });
        this.setState({ movies: this.state.movies.concat(temp) });
      });
  };

  getNowPlayingMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&page=1&total_results=6`
      )
      .then((res) => {
        const temp = [];
        res.data.results.map((movie) => {
          if (movie.poster_path !== null) {
            temp.push(movie);
          }
        });
        this.setState({ NowPlaying: temp });
      });
  };

  searchChangeHandler(value) {
    const searchTerm = value;
    if (searchTerm.length === 0) {
      this.setState({ movies: [] });
      this.setState({ page: 1 });
      this.setState({ searching: false });
      this.getMovies();
    } else {
      this.setState({ query: value });
      this.setState({ searching: true });
      this.searchMovies(value);
    }
  }

  getPopular() {
    this.setState({ filter: "popular" });
    setTimeout(() => {
      if (this.state.filter === "popular") {
        this.setState({ popular: true });
        this.setState({ rated: false });
        this.setState({ upcoming: false });
      } else {
        this.setState({ popular: false });
      }
      this.getMovies();
    }, 100);
  }
  getRated() {
    this.setState({ filter: "top_rated" });
    setTimeout(() => {
      if (this.state.filter === "top_rated") {
        this.setState({ rated: true });
        this.setState({ popular: false });
        this.setState({ upcoming: false });
      } else {
        this.setState({ rated: false });
      }
      this.getMovies();
    }, 100);
  }
  getUpcoming() {
    this.setState({ filter: "upcoming" });
    setTimeout(() => {
      if (this.state.filter === "upcoming") {
        this.setState({ upcoming: true });
        this.setState({ rated: false });
        this.setState({ popular: false });
      } else {
        this.setState({ upcoming: false });
      }
      this.getMovies();
    }, 100);
  }

  render() {
    return (
      <Container>
        <Header></Header>
        <Columns>
          <Columns.Column size="one-quarter">
            <NowPlaying movies={this.state.NowPlaying}></NowPlaying>
          </Columns.Column>
          <Columns.Column>
            <Columns>
              <Columns.Column>
                <h1 className="title">Explore</h1>
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column size="two-thirds">
                <Search onChange={this.searchChangeHandler.bind(this)}></Search>
              </Columns.Column>
              <Columns.Column className="filters">
                <h2
                  className={this.state.popular ? "active" : ""}
                  onClick={this.getPopular.bind(this)}
                >
                  Popular
                </h2>
                <h2
                  className={this.state.rated ? "active" : ""}
                  onClick={this.getRated.bind(this)}
                >
                  Top Rated
                </h2>
                <h2
                  className={this.state.upcoming ? "active" : ""}
                  onClick={this.getUpcoming.bind(this)}
                >
                  Upcoming
                </h2>
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column>
                {this.state.popular ? (
                  <h1 className="subtitle">Most Popular movies 2020</h1>
                ) : (
                  ""
                )}
                {this.state.rated ? (
                  <h1 className="subtitle">Top Rated movies 2020</h1>
                ) : (
                  ""
                )}
                {this.state.upcoming ? (
                  <h1 className="subtitle">Upcoming movies </h1>
                ) : (
                  ""
                )}
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column>
                {this.state.searching === false && (
                  <InfiniteScroll
                    dataLength={this.state.movies.length}
                    next={this.fetchMovies}
                    hasMore={true}
                  >
                    <MovieContainer movies={this.state.movies}></MovieContainer>
                  </InfiniteScroll>
                )}
                {this.state.searching === true && (
                  <InfiniteScroll
                    dataLength={this.state.movies.length}
                    next={this.fetchMoviesSearch}
                    hasMore={true}
                  >
                    <MovieContainer movies={this.state.movies}></MovieContainer>
                  </InfiniteScroll>
                )}
              </Columns.Column>
            </Columns>
          </Columns.Column>
        </Columns>
      </Container>
    );
  }
}

export default App;
