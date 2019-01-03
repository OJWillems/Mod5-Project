import React from 'react';
import {connect} from 'react-redux';

import {Button} from 'semantic-ui-react';

import Question from './Question';

const QuestionsContainer = (props) => {

  const mapBandsQuestions = () => {
    if (props.allBandsQuestions) {
      return props.allBandsQuestions.map((questionObj) => {
        if (questionObj.has_answered === false) {
          return (
            <div key={questionObj.id} >
              < Question questionObj={questionObj} />
            </div>
          )
        }
      })
    }
  }

  return (
    <div>
      <h1 className="questionsContainerHeader">All Your Unanswered Questions:</h1>
      <Button color="purple" size="small" name="go_back_to_band_details" onClick={() => props.goBackToBandDetails()} className="questionContainerBackButton">Back to Band Page</Button>
      <div className="questionContainer">{mapBandsQuestions()}</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    goBackToBandDetails: () => {
      dispatch({
        type: "GO_BACK_TO_BAND_DETAILS",
        payload: "band details page"
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInBand: state.loggedInBand,
    allBandsQuestions: state.allBandsQuestions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer)
