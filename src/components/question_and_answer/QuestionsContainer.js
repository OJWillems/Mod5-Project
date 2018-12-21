import React from 'react';
import {connect} from 'react-redux';

import Question from './Question';

const QuestionsContainer = (props) => {

  const bandQuestionsAPI = `http://localhost:4000/api/v1/bands/${props.loggedInBand.id}/questions`

  // console.log("API: ", bandQuestionsAPI)

  const fetchBandsQuestions = () => {
    fetch(bandQuestionsAPI)
      .then(resp => resp.json())
      .then(bandQuestionsResp => props.getAllBandsQuestions(bandQuestionsResp))
  }

  fetchBandsQuestions()

  const mapBandsQuestions = () => {
    if (props.allBandsQuestions) {
      return props.allBandsQuestions.map((questionObj, idx) => {
        return < Question key={idx} questionObj={questionObj} />
      })
    }
  }

  return (
    <div>
      {mapBandsQuestions()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInBand: state.loggedInBand,
    allBandsQuestions: state.allBandsQuestions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBandsQuestions: (bandQuestionsResp) => {
      dispatch({
        type: "GET_BANDS_QUESTIONS",
        payload: bandQuestionsResp.questions
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsContainer)
