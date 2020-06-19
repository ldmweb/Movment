import React, { Component } from "react";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import "./App.scss";
import MovieContainer from "./Components/MovieContainer.js";
import Header from "Components/Header";
import Search from "Components/Search";
import Upcoming from "Components/Upcoming";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      upcoming: [],
      page: 1,
      searching: false,
      query: "",
    };
  }

  componentDidMount() {
    this.getMovies();
    this.getUpcomingMovies();
  }

  getMovies = () => {
    console.log("getMovies");
    this.setState({ page: 1 });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&page=1`
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
    console.log("fetchMovies");
    this.setState({ page: this.state.page + 1 });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&page=` +
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
    console.log("searchMovies");
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
    console.log("fetchMoviesSearch");
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

  getUpcomingMovies = () => {
    console.log("getUpcomingMovies");
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=5b3d3b7b2104a00830b31ae94c5b5c82&language=en-US&adult=false&page=1&total_results=6`
      )
      .then((res) => {
        console.log(res.data.results);
        const temp = [];
        res.data.results.map((movie) => {
          if (movie.poster_path !== null) {
            temp.push(movie);
          }
        });
        this.setState({ upcoming: temp });
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

  render() {
    return (
      <Container>
        <Header></Header>
        <Columns>
          <Columns.Column size="one-quarter">
            <Upcoming movies={this.state.upcoming}></Upcoming>
          </Columns.Column>
          <Columns.Column>
            <Columns>
              <Columns.Column>
                <h1 className="title">Explore</h1>
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column size="three-quarters">
                <Search onChange={this.searchChangeHandler.bind(this)}></Search>
              </Columns.Column>
              <Columns.Column>Filter</Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column>
                <h1 className="subtitle">Most Popular movies 2020</h1>
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column>
                {this.state.searching === false && (
                  <InfiniteScroll
                    dataLength={this.state.movies.length}
                    next={this.fetchMovies}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                  >
                    <MovieContainer movies={this.state.movies}></MovieContainer>
                  </InfiniteScroll>
                )}
                {this.state.searching === true && (
                  <InfiniteScroll
                    dataLength={this.state.movies.length}
                    next={this.fetchMoviesSearch}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
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
