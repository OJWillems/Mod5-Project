import React, { Component } from 'react';
import './App.css';

import StartHome from './components/home_screens/StartHome'
import BandLogin from './components/home_screens/BandLogin'

import BandSignUpForm from './components/home_screens/BandSignUpForm';

const bandsAPI = 'http://localhost:4000/api/v1/bands'

class App extends Component {

  state = {
    homeScreen: "start",


    bandUserName: null,
    bandPassword: null,
    bandName: null,
    bandBio: null,

  }

  bandOrListenerButtonHandler = (event) => {
    if (event.target.name === "band") {
      this.setState({
        homeScreen: "band login"
      })
    } else if (event.target.name === "listener") {
      this.setState({
        homeScreen: "listener login"
      })
    }
  }

  newBandButtonHandler = (event) => {
    if (event.target.name === "new band") {
      this.setState({
        homeScreen: "new band"
      })
    }
  }

  renderPage = () => {
    switch (this.state.homeScreen) {
      case "band login":
        return (
          <BandLogin newBandButtonHandler={this.newBandButtonHandler}/>
        )
      case "new band":
        return (
          <BandSignUpForm bandSignUp={this.bandSignUp} />
        )
      case "listener login":
        return (
          <div>LISTENER</div>
        )
      default:
        return (
          <StartHome bandOrListenerButtonHandler={this.bandOrListenerButtonHandler} />
        )
    }
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

  render() {
    return (
      <div>
        <>{this.renderPage()}</>
      </div>
    );
  }
}

export default App;
