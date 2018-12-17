import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'

import StartHome from './components/main_screens/StartHome';
import BandLogin from './components/main_screens/BandLogin';
import BandSignUpForm from './components/main_screens/BandSignUpForm';
import ListenerLogin from './components/main_screens/ListenerLogin';
import ListenerSignUpForm from './components/main_screens/ListenerSignUpForm';

const bandsAPI = 'http://localhost:4000/api/v1/bands'
const listenersAPI = 'http://localhost:4000/api/v1/listeners'

class App extends Component {

  state = {
    // homeScreen: "start",

    bandUserName: null,
    bandPassword: null,
    bandName: null,
    bandBio: null,

    listenerUserName: null,
    listenerPassword: null,

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
          password: this.state.listenerPassword
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
    homeScreen: state.homeScreen
  }
}

export default connect(mapStateToProps)(App);
