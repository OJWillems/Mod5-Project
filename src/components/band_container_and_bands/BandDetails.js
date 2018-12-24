import React, {Component} from 'react';
import {connect} from 'react-redux';

import FollowButton from './FollowButton';
import QuestionForm from '../question_and_answer/QuestionForm';

const favoritesAPI = 'http://localhost:4000/api/v1/favorites';

class BandDetails extends Component {

  state = {
    isFollowing: null,
    specificFavoriteObject: null,
    questionAsked: false,
  }


  // This is the method that determines if the listener is already following this band or not and is passed down to the button so it knows which version of itself to render - the follow / unfollow button.
  setIsFollowingState = () => {
    let alreadyFollowing = this.props.allListenerFavorites.find((bandObj) => {
      return bandObj.id === this.props.selectedBand.id
    })
    if (alreadyFollowing === undefined) {
      this.setState({isFollowing: false,})
    } else {
      this.setState({isFollowing:true})
    }
  }

  // This is the method that determines if the band is already being followed by the user and sets the favorite object so it can be called by the unfollow method on the page load.
  setSpecificFavoriteObjectState = () => {
    let specificFavoriteObject = null;
    let specificFavoriteObj = this.props.allFavorites.find((favoriteObj) => {
      return favoriteObj.band_id === this.props.selectedBand.id && favoriteObj.listener_id === this.props.loggedInListener.id
    })
    if (specificFavoriteObj !== undefined) {
      specificFavoriteObject = specificFavoriteObj
    }
    this.setState({specificFavoriteObject: specificFavoriteObject}, () => console.log(this.state.specificFavoriteObject))
  }

  // Conditionally renders the follow button depending on whether the listener is logged in.
  renderFollowButton = () => {
    if (this.props.loggedInListener) {
      return < FollowButton isFollowing={this.state.isFollowing} createNewFollow={this.createNewFollow} unfollow={this.unfollow} />
    }
  }

  // Conditionally set redux store for allBandsQuestions if band is logged in
  fetchBandsQuestions = () => {
    console.log(this.props.loggedInBandAPI)
    fetch(this.props.loggedInBandAPI)
      .then(resp => resp.json())
      .then(bandQuestionsResp => this.props.getAllBandsQuestions(bandQuestionsResp))
  }


  // Conditionally call on these methods if you're logged in as a listener.
  componentDidMount(){
    if (this.props.loggedInListener) {
      this.setIsFollowingState()
      this.setSpecificFavoriteObjectState()
      // this.renderQuestionForm()
    } else {
      this.fetchBandsQuestions()
      // this.getBandQuestionsAPI()
    }
  }

  // Creates a new follow relationship with the follow button, but also uses the response at the end to set the specificFavoriteObject so you can follow and unfollow as many times as you want without refreshing the page.
  createNewFollow = () => {
    fetch(favoritesAPI, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        band_id: this.props.selectedBand.id,
        listener_id: this.props.loggedInListener.id,
      })
    })
      .then(this.setState({isFollowing: true}))
      .then(resp => resp.json())
      .then(favoriteObj => this.setState({specificFavoriteObject: favoriteObj.favorite}, () => console.log(this.state.specificFavoriteObject)))
  }

  unfollow = () => {
    fetch(favoritesAPI + `/${this.state.specificFavoriteObject.id}`, {
      method: 'DELETE'
    })
      .then(this.setState({isFollowing: false}))
  }

  // Conditionally renders the new question button if listener is logged in
  renderQuestionButton = () => {
    if (this.props.loggedInListener) {
      return <button name="ask question" onClick={() => this.setState({questionAsked: true})}>Ask a Question</button>
    }
  }

  renderQuestionForm = () => {
    if (this.state.questionAsked) {
      return <QuestionForm unrenderQuestion={this.unrenderQuestion} />
    }
  }

  unrenderQuestion = () => {
    this.setState({questionAsked: false})
  }

  // Conditionally renders button if BAND is logged in to display a Check Questions button.
  showQuestions = () => {
    if (this.props.loggedInBand) {
      return <button name="view questions" onClick={() => this.props.viewQuestionsContainer()} >View Questions</button>
    }
  }

  // Start Rendering Questions and Answers if answered
  showQuestionsAndAnswers = () => {
    // fetch all of a band's questions and map through them. If questionObj.has_answered === true, render it.
    // for that same question, render the answer that corresponds to it. Will likely have to create an answer route in the questions controller.

  }


  render() {
    return(
      <div>
        <h1>{this.props.selectedBand.band_name}</h1>
        <p>{this.props.selectedBand.bio}</p>
        {this.renderFollowButton()}
        {this.renderQuestionButton()}
        {this.renderQuestionForm()}
        {this.showQuestions()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    selectedBand: state.selectedBand,
    loggedInListener: state.loggedInListener,
    allFavorites: state.allFavorites,
    allListenerFavorites: state.allListenerFavorites,
    loggedInBand: state.loggedInBand,
    loggedInBandAPI: state.loggedInBandAPI
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewQuestionsContainer: () => {
      dispatch({
        type: "SHOW_QUESTIONS",
        payload: "view questions container"
      })
    },
    getAllBandsQuestions: (bandQuestionsResp) => {
      dispatch({
        type: "GET_BANDS_QUESTIONS",
        payload: bandQuestionsResp.questions
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandDetails);
