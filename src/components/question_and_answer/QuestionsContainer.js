import React from 'react';
import {connect} from 'react-redux';

import Question from './Question';

const QuestionsContainer = (props) => {

  const mapBandsQuestions = () => {
    if (props.allBandsQuestions) {
      return props.allBandsQuestions.map((questionObj) => {
        // console.log(questionObj.answer)
        // console.log(questionObj.answers)
        return (
          <div key={questionObj.id}>
            < Question questionObj={questionObj} />
            <br/>
          </div>)
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

export default connect(mapStateToProps)(QuestionsContainer)
