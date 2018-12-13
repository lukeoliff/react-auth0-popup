import React, { Component } from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";
import TvShows from "./components/TvShows.js";
import Movies from "./components/Movies.js";
import Auth from "./auth/service";

const auth = new Auth();

class App extends Component {
  loggedIn(state) {
    const { history } = this.props
    // do some bits
    this.setState({ loggedIn: state.loggedIn });

    history.push('/movies');
  }

  loggedOut(state) {
    const { history } = this.props
    // do some bits
    this.setState({ loggedIn: state.loggedIn });

    history.push('/');
  }

  constructor(props) {
    super(props);

    auth.loginCallback = this.loggedIn.bind(this);
    auth.logoutCallback = this.loggedOut.bind(this);

    this.state = { loggedIn: false };
  }

  render() {
    return (
      <div>
        <Route component={TvShows} path="/" exact />
        <Route component={Movies} path="/movies" />
        { this.state.loggedIn ? (
          <button onClick={() => auth.logout()} className="log-in">
            Log Out
          </button>
        ) : (
          <button onClick={() => auth.login()} className="log-in">
            Log In
          </button>
        )}
      </div>
    );
  }
}

export default withRouter(App)
