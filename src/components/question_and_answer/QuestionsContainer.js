import React from 'react';
import {connect} from 'react-redux';

import Question from './Question';

const QuestionsContainer = (props) => {

  const mapBandsQuestions = () => {
    if (props.allBandsQuestions) {
      return props.allBandsQuestions.map((questionObj) => {
        if (questionObj.has_answered === false) {
          return (
            <div key={questionObj.id}>
              < Question questionObj={questionObj} />
              <br/>
            </div>
          )
        }
      })
    }
  }

  return (
    <div>
      {mapBandsQuestions()}
      <button name="go_back_to_band_details" onClick={() => props.goBackToBandDetails()} >Back</button>
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
