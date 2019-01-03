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

class App extends Component {

  state = {
    bandUserName: null,
    bandPassword: null,
    bandName: null,
    bandBio: null,
    genre: null,
    bandMembers: null,
    imgUrl: null,

    listenerUserName: null,
    listenerPassword: null,
    listenerName: null,

  }

  getBandsAndListeners = () => {
    fetch(bandsAPI)
      .then(resp => resp.json())
      .then(bandResp => this.props.allBands(bandResp))
    fetch(listenersAPI)
      .then(resp => resp.json())
      .then(listenersResp => this.props.allListeners(listenersResp))
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
      bandBio: event.target.bio.value,
      genre: event.target.genre.value,
      bandMembers: event.target.bandMembers.value,
      imgUrl: event.target.imgUrl.value
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
          bio: this.state.bandBio,
          genre: this.state.genre,
          band_members: this.state.bandMembers,
          img_url: this.state.imgUrl
        })
      })
      .then(resp => resp.json())
      .then(signedUpBandObj => this.props.signUpBandRedirect(signedUpBandObj))
    })
  }

  listenerSignUp = (event) => {
    event.preventDefault()
    this.setState({
      listenerUserName: event.target.username.value,
      listenerPassword: event.target.password.value,
      listenerName: event.target.name.value
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
          name: this.state.listenerName
        })
      })
        .then(resp => resp.json())
        .then(signedUpListenerObj => this.props.signUpListenerRedirect(signedUpListenerObj))
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
      case "start home":
        return(
          <StartHome />
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
    signUpListenerRedirect: (signedUpListenerObj) => {
      dispatch({
        type: "SIGN_UP_LISTENER",
        payload: signedUpListenerObj.listener
      })
    },
    signUpBandRedirect: (signedUpBandObj) => {
      dispatch({
        type: "SIGN_UP_BAND",
        payload: signedUpBandObj.band
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
