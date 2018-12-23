import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'

import StartHome from './components/login_signup_screens/StartHome';
import BandLogin from './components/login_signup_screens/BandLogin';
import BandSignUpForm from './components/login_signup_screens/BandSignUpForm';
import ListenerLogin from './components/login_signup_screens/ListenerLogin';
import ListenerSignUpForm from './components/login_signup_screens/ListenerSignUpForm';

import BandContainer from './components/band_container_and_bands/BandContainer';
import BandDetails from './components/band_container_and_bands/BandDetails';

import QuestionsContainer from './components/question_and_answer/QuestionsContainer';


const bandsAPI = 'http://localhost:4000/api/v1/bands';
const listenersAPI = 'http://localhost:4000/api/v1/listeners';
const favoritesAPI = 'http://localhost:4000/api/v1/favorites';

//YOU CAN'T FETCH TO THIS API UNTIL AFTER YOU'VE LOGGED IN
// const listenerFavoritesAPI = `http://localhost:4000/api/v1/listeners/1/favorites`;

class App extends Component {

  state = {
    bandUserName: null,
    bandPassword: null,
    bandName: null,
    bandBio: null,

    listenerUserName: null,
    listenerPassword: null,

  }

  getBandsAndListeners = () => {
    fetch(bandsAPI)
      .then(resp => resp.json())
      .then(bandResp => this.props.allBands(bandResp))
    fetch(listenersAPI)
      .then(resp => resp.json())
      .then(listenersResp => this.props.allListeners(listenersResp))
    fetch(favoritesAPI)
      .then(resp => resp.json())
      .then(favoritesResp => this.props.allFavorites(favoritesResp))
  }

  componentDidMount() {
    this.getBandsAndListeners();
  }

  bandSignUp = (event) => {
    event.preventDefault()
    this.setState({
      bandUserName: event.target.username.value,
      bandPassword: event.target.password.value,
      bandName: event.target.bandName.value,
      bandBio: event.target.bio.value
    }, () => {
      fetch(bandsAPI, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          username: this.state.bandUserName,
          password: this.state.bandPassword,
          band_name: this.state.bandName,
          bio: this.state.bandBio
        })
      })
    })
  }

  listenerSignUp = (event) => {
    event.preventDefault()
    this.setState({
      listenerUserName: event.target.username.value,
      listenerPassword: event.target.password.value
    }, () => {
      fetch(listenersAPI, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json"
        },
        body: JSON.stringify({
          username: this.state.listenerUserName,
          password: this.state.listenerPassword,
          name: this.state.name
        })
      })
    })
  }

  renderPage = () => {
    switch (this.props.homeScreen) {
      case "band login":
        return (
          <BandLogin />
        )
      case "new band":
        return (
          <BandSignUpForm bandSignUp={this.bandSignUp} />
        )
      case "listener login":
        return (
          <ListenerLogin />
        )
      case "new listener":
        return (
          <ListenerSignUpForm listenerSignUp={this.listenerSignUp} />
        )
      case "listener home page":
        return (
          <BandContainer />
        )
      case "band details page":
        return(
          <BandDetails />
        )
      case "view questions container":
        return(
          <QuestionsContainer />
        )
      default:
        return (
          <StartHome />
        )
    }
  }

  render() {
    return (
      <div>
        <>{this.renderPage()}</>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    homeScreen: state.homeScreen,
    loggedInListener: state.loggedInListener
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allBands: (bandsResp) => {
      dispatch({
        type: "GET_ALL_BANDS",
        payload: bandsResp.bands
      })
    },
    allListeners: (listenersResp) => {
      dispatch({
        type: "GET_ALL_LISTENERS",
        payload: listenersResp.listeners
      })
    },
    allFavorites: (favoritesResp) => {
      dispatch({
        type: "GET_ALL_FAVORITES",
        payload: favoritesResp.favorites
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
