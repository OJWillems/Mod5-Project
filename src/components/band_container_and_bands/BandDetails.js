import React, {Component} from 'react';
import {connect} from 'react-redux';

import FollowButton from './FollowButton';
import QuestionForm from '../question_and_answer/QuestionForm';
import QuestionAndAnswer from '../question_and_answer/QuestionAndAnswer';

import { Button, Image } from 'semantic-ui-react'

const favoritesAPI = 'http://localhost:4000/api/v1/favorites';

class BandDetails extends Component {

  state = {
    isFollowing: null,
    specificFavoriteObject: null,
    questionAsked: false,
  }


  // THIS IS HERE SO THAT WHEN YOU LOG IN AS A LISTENER YOU CAN ACCESS THE SPECIFIC BAND'S QUESTIONS FOR USE IN THE setSelectedBandAnsweredQuestions METHOD
  // NOTE: props.selectedBand in Redux is set both when a listener selects a band AND when a band logs in - technically the logged in band is also the selected band.
  selectedBandQuestionsAPI = `http://localhost:4000/api/v1/bands/${this.props.selectedBand.id}/questions/`

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
    this.setState({specificFavoriteObject: specificFavoriteObject})
  }

  // Conditionally renders the follow button depending on whether the listener is logged in.
  renderFollowButton = () => {
    if (this.props.loggedInListener) {
      return < FollowButton isFollowing={this.state.isFollowing} createNewFollow={this.createNewFollow} unfollow={this.unfollow} />
    }
  }

  // Conditionally renders a go back to Bands page
  renderGoBackToBandsContainer = () => {
    if (this.props.loggedInListener) {
      return <div><Button color="purple" name="go_back_to_bands" onClick={() => this.props.goBackToBandsContainer()} className="goBackToBandsButton" >Go Back To Bands</Button></div>
    }
  }

  // Conditionally set redux store for allBandsQuestions if band is logged in
  fetchBandsQuestions = () => {
    console.log(this.props.loggedInBandAPI)
    fetch(this.props.loggedInBandAPI)
      .then(resp => resp.json())
      .then(bandQuestionsResp => this.props.getAllBandsQuestions(bandQuestionsResp))
  }


  // THIS WILL SET A SELECTED BAND'S QUESTIONS ONLY IF THEIR has_answered ATTRIBUTE IS TRUE
  setSelectedBandAnsweredQuestions = () => {
    fetch(this.selectedBandQuestionsAPI)
      .then(resp => resp.json())
      .then(selectedBandQuestionsResp => {
        const selectedBandAnsweredQuestions = []
        selectedBandQuestionsResp.questions.map(selectedBandQuestionsObj => {
          if(selectedBandQuestionsObj.has_answered) {
            selectedBandAnsweredQuestions.push(selectedBandQuestionsObj)
          }
        })
        this.props.getAllSelectedBandsAnsweredQuestions(selectedBandAnsweredQuestions)
      })
  }


  // Conditionally call on these methods if you're logged in as a listener.
  componentDidMount(){
    if (this.props.loggedInListener) {
      this.setIsFollowingState()
      this.setSpecificFavoriteObjectState()
      this.setSelectedBandAnsweredQuestions()
    } else {
      this.fetchBandsQuestions()
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
      .then(favoriteObj => this.setState({specificFavoriteObject: favoriteObj.favorite}))
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
      return <div><Button color="blue" name="ask question" onClick={() => this.setState({questionAsked: true})} className="askAQuestionButton">Ask a Question</Button></div>
    }
  }

  renderQuestionForm = () => {
    if (this.state.questionAsked) {
      return <QuestionForm unrenderQuestion={this.unrenderQuestion} />
    }
  }

// note that this method is passed down to renderQuestionForm so the cancel button on the question form will unrender the component.
  unrenderQuestion = () => {
    this.setState({questionAsked: false})
  }

  // Conditionally renders button if BAND is logged in to display a Check Questions button.
  showQuestions = () => {
    if (this.props.loggedInBand) {
      return <Button color="blue" name="view questions" onClick={() => this.props.viewQuestionsContainer()} className="viewQuestionsButton">View Questions</Button>
    }
  }

  // Frankly I'm not sure what's with this different conditional render... but I'll keep it up in case everything breaks. I'm assuming the first half is to render the answered questions when the band is logged in, whereas the second is when the listener is logged in. I'm a little confused, considering the Selected band is the same.
  renderAnsweredQuestions = () => {
    if (this.props.allBandsQuestions) {
      return this.props.allBandsQuestions.map(questionObj => {
        if (questionObj.has_answered) {
          return (
            <QuestionAndAnswer key={questionObj.id} questionObj={questionObj} />
          )
        }
      })
    } else if (this.props.allSelectedBandsAnsweredQuestions) {
      return this.props.allSelectedBandsAnsweredQuestions.map(questionObj => {
        return (
          <QuestionAndAnswer key={questionObj.id} questionObj={questionObj}/>
        )
      })
    }
  }

  render() {
    return(
      <div>
        <h1 className="bandDetailsHeader">{this.props.selectedBand.band_name}</h1>
        <div className="bandDetailsImage"><Image src={this.props.selectedBand.img_url} alt={this.props.selectedBand.band_name} size="massive" /></div>
        <br/>
        <h4 className="bandDetailsBioHeader">Bio:</h4>
        <p className="bandDetailsBio">{this.props.selectedBand.bio}</p>
        {this.renderFollowButton()}
        {this.renderQuestionButton()}
        {this.renderGoBackToBandsContainer()}
        {this.renderQuestionForm()}
        {this.showQuestions()}
        <h4 className="qAndAHeader">Q&A:</h4>
        <div className="qAndAContainerDiv">{this.renderAnsweredQuestions()}</div>
      </div>
    )
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
    },
    getAllSelectedBandsAnsweredQuestions: (selectedBandAnsweredQuestions) => {
      dispatch({
        type: "GET_ALL_SELECTED_BANDS_ANSWERED_QUESTIONS",
        payload: selectedBandAnsweredQuestions
      })
    },
    goBackToBandsContainer: () => {
      dispatch({
        type: "GO_BACK_TO_BANDS_CONTAINER",
        payload: "listener home page"
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedBand: state.selectedBand,
    loggedInListener: state.loggedInListener,
    allFavorites: state.allFavorites,
    allListenerFavorites: state.allListenerFavorites,
    loggedInBand: state.loggedInBand,
    loggedInBandAPI: state.loggedInBandAPI,
    allBandsQuestions: state.allBandsQuestions,
    allSelectedBandsAnsweredQuestions: state.allSelectedBandsAnsweredQuestions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandDetails);
